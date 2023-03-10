from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, UserCalendar
from app.forms import validation_errors_formatter
from app.forms.calendar_form import CalendarForm
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from random import randint
import calendar as pycalendar

bp = Blueprint('calendars', __name__, url_prefix="/calendars")
colors = [
    '#AD1457',
    '#F4511E',
    "#A8974F",
    "#317150",
    '#3F51B5',
    '#8E24AA',
    '#D81B60',
    '#EF6C00',
    '#C0CA33',
    '#009688',
    '#7986CB',
    '#795548',
    '#848A8F',
    '#F09300',
    '#7CB342',
    '#039BE5',
    '#B39DDB',
    '#616161',
    '#E67C73',
    '#F6BF26',
    '#33B679',
    '#4285F4',
    '#9E69AF',
    '#A79B8E'
]


@bp.route("/current", methods=["GET"])
@login_required
def get_calendar_of_current():
    user = User.query.filter(User.id == current_user.id).first()
    return [calendar.to_dict() for calendar in user.calendars]


@bp.route("", methods=["POST"])
@login_required
def post_calendar():
    form = CalendarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        calendar = Calendar(
            owner_id=current_user.id,
            name=data['name'],
            description=data['description'],
            timezone=data['timezone'],
            is_default=data.get('is_default', False)
        )
        user_calendar = UserCalendar(
            user_id=current_user.id,
            calendar=calendar,
            color='#6BB29C' if calendar.is_default else colors[randint(
                1, 100) % 10])
        db.session.add(calendar, user_calendar)
        db.session.commit()
        # Add is_displayed property
        response = calendar.to_dict()
        response['is_displayed'] = user_calendar.is_displayed
        return response, 201
    else:
        return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("/<int:calendar_id>", methods=["PUT"])
@login_required
def update_calendar(calendar_id):
    form = CalendarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        calendar = Calendar.query.get(calendar_id)
        if calendar.owner.id == current_user.id:
            calendar.name = data['name'],
            calendar.description = data['description'],
            calendar.timezone = data['timezone']
            db.session.commit()
            return calendar.to_dict(), 200
        else:
            return {'errors': ['Unauthorized']}, 401
    else:
        return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("/<int:calendar_id>", methods=["DELETE"])
@login_required
def delete_calendar(calendar_id):
    calendar = Calendar.query.get(calendar_id)
    if calendar.owner.id == current_user.id:
        db.session.delete(calendar)
        db.session.commit()
        return {"message": f"Deleted calendar with id {calendar_id}"}
    else:
        return {'errors': ['Unauthorized']}, 401


@bp.route("/<int:calendar_id>/events", methods=["GET"])
@login_required
def get_events_by_calendar_id(calendar_id):
    calendar = Calendar.query.get(calendar_id)
    year = int(request.args.get("year"))
    month = int(request.args.get("month"))
    last_day_of_month = pycalendar.monthrange(year, month)[1]
    month_start = datetime(year, month, 1, tzinfo=ZoneInfo(calendar.timezone))
    month_end = datetime(year, month, last_day_of_month, 23,
                         59, 59, 999999, tzinfo=ZoneInfo(calendar.timezone))
    #  calculate the first day of the week that the first day of the month falls in
    start = month_start - timedelta(days=(month_start.weekday() + 1) % 7)
    #  calculate the last day of the week that the last day of the month falls in
    end = month_end + timedelta(days=6)

    all_events = calendar.events
    month_events = list(filter(lambda event: event.end_date >= start or
                               (event.start_time >= start and event.start_time <= end), all_events))
    return [event.to_dict(current_user.id) for event in month_events]


@bp.route("/<int:calendar_id>/events", methods=["DELETE"])
@login_required
def delete_events_by_calendar_id(calendar_id):
    calendar = Calendar.query.get(calendar_id)
    for event in calendar.events:
        db.session.delete(event)
    db.session.commit()
    return {"message": f"Deleted all events of the default calendar with id {calendar_id}"}
