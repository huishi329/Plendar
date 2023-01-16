from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, EventGuest, Event
from app.forms import validation_errors_formatter

bp = Blueprint('events_guests', __name__, url_prefix="/events_guests")


@bp.route("", methods=["POST"])
@login_required
def add_event_guest():
    pass
