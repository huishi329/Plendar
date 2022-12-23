from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, Calendar
import datetime
from zoneinfo import ZoneInfo
import calendar as pycalendar

bp = Blueprint('calendars', __name__, url_prefix="/calendars")

@bp.route("/current")
@login_required
def get_calendar_of_current():
    user = User.query.filter(User.id == current_user.id).first()
    return [calendar.to_dict() for calendar in user.calendars]


@bp.route("/<int:calendar_id>/events")
@login_required
def get_events_by_calendar_id(calendar_id):
    calendar = Calendar.query.get(calendar_id)
    year = int(request.args.get("year"))
    month = int(request.args.get("month"))
    last_day_of_month = pycalendar.monthrange(year, month)[1]
    month_start = datetime.datetime(year, month, 1, tzinfo=ZoneInfo(calendar.timezone))
    month_end = datetime.datetime(year, month, last_day_of_month, 23, 59, 59, 999999, tzinfo=ZoneInfo(calendar.timezone))

    all_events = calendar.events
    month_events = list(filter(lambda event: event.end_date >= month_start or
                                    (event.start_time >= month_start and event.start_time <= month_end), all_events))
    return [event.to_dict() for event in month_events]
