from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Calendar

bp = Blueprint('calendars', __name__, url_prefix="/calendars")

@bp.route("/current")
@login_required
def getCalendarOfCurrentUser():
    user = User.query.filter(User.id == current_user.id).first()
    return [calendar.to_dict() for calendar in user.calendars]
