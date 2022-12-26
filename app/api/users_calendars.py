from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, UserCalendar

bp = Blueprint('users_calendars', __name__, url_prefix="/users_calendars")

@bp.route("/<int:user_id>/<int:calendar_id>", methods=['PATCH'])
@login_required
def toggle_calendar(user_id, calendar_id):
    user_calendar = UserCalendar.query.filter(
        UserCalendar.user_id == user_id,
        UserCalendar.calendar_id == calendar_id).first();
    print(user_calendar)
    user_calendar.is_displayed = not user_calendar.is_displayed
    db.session.commit()
    return user_calendar.to_dict()
