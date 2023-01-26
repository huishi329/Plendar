from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, UserCalendar

bp = Blueprint('users_calendars', __name__, url_prefix="/users_calendars")


@bp.route("/current/<int:calendar_id>", methods=['PATCH'])
@login_required
def toggle_calendar(calendar_id):
    user_calendar = UserCalendar.query.filter(
        UserCalendar.user_id == current_user.id,
        UserCalendar.calendar_id == calendar_id).first()
    user_calendar.is_displayed = not user_calendar.is_displayed
    db.session.commit()
    return user_calendar.to_dict()
