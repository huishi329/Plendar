from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, EventGuest, Event
from app.forms import validation_errors_formatter

bp = Blueprint('events_guests', __name__, url_prefix="/events_guests")


@bp.route("/<int:event_id>", methods=["PATCH"])
@login_required
def update_event_status(event_id):
    status = request.json['status']
    event_guest = EventGuest.query.filter(
        EventGuest.event_id == event_id, EventGuest.guest_id == current_user.id).one()
    event_guest.status = status
    db.session.commit()
    return {"message": f"Guest {current_user.id} responded {status} to event {event_id}"}
