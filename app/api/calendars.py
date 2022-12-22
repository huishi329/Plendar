from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Calendar

bp = Blueprint('calendars', __name__, url_prefix="/calendars")

@bp.route("/current")
@login_required
def readCalendarOfCurrentUser():
    user = User.query.filter(User.id == current_user.id).first()
    print(user)
    # calendars = Calendar.query.filter(Calendar.users.has(user)).all()
    # return [calendar.to_dict() for calendar in calendars]
    return []
