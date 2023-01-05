from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, UserCalendar
from app.forms import validation_errors_formatter
from app.forms.calendar_form import CalendarForm
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import calendar as pycalendar

bp = Blueprint('calendars', __name__, url_prefix="/calendars")


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
            timezone=data['timezone']
        )
        user_calendar = UserCalendar(
            user_id=current_user.id,
            calendar=calendar
        )
        db.session.add(calendar, user_calendar)
        db.session.commit()
        return calendar.to_dict(), 201
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
    start = month_start - timedelta(days=(month_start.weekday() + 1) % 7)
    end = month_end + timedelta(days=5)

    all_events = calendar.events
    month_events = list(filter(lambda event: event.end_date >= start or
                               (event.start_time >= start and event.start_time <= end), all_events))
    return [event.to_dict() for event in month_events]
