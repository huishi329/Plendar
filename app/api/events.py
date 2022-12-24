from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, Event
from app.forms.event_form import EventForm
from app.forms import validation_errors_formatter

bp = Blueprint('events', __name__, url_prefix="/events")

@bp.route("", methods=["POST"])
@login_required
def post_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        calendar=Calendar.query.get(data['calendar_id'])
        if calendar.owner.id == current_user.id:
            event = Event(
                calendar_id=data['calendar_id'],
                title=data['title'],
                address=data['address'],
                description=data["description"],
                start_time=data["start_time"],
                end_time=data["end_time"],
                end_date=data["end_date"],
                recurrence=data['recurrence']
            )
            db.session.add(event)
            db.session.commit()
            return event.to_dict(), 201
        else:
            return {'errors': ['Unauthorized']}, 401
    return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("/<int:event_id>", methods=["PUT"])
@login_required
def update_event(event_id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        calendar=Calendar.query.get(data['calendar_id'])
        if calendar.owner.id == current_user.id:
            event = Event.query.get(event_id)
            event.calendar_id=data['calendar_id'],
            event.title=data['title'],
            event.address=data['address'],
            event.description=data["description"],
            event.start_time=data["start_time"],
            event.end_time=data["end_time"],
            event.end_date=data["end_date"],
            event.recurrence=data['recurrence']
            db.session.commit()
            return event.to_dict(), 200
        else:
            return {'errors': ['Unauthorized']}, 401
    return {'errors': validation_errors_formatter(form, form.errors)}, 400

@bp.route("/<int:event_id>", methods=["DELETE"])
@login_required
def delete_event(event_id):
    event = Event.query.get(event_id)
    if event.calendar.owner.id == current_user.id:
        db.session.delete(event)
        db.session.commit()
        return {"message": f"Deleted event with id {event_id}"}
    else:
        return "404", 404
