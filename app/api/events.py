import json
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, Calendar, Event, EventGuest
from app.forms.event_form import EventForm
from app.forms import validation_errors_formatter

bp = Blueprint('events', __name__, url_prefix="/events")


@bp.route("/<int:event_id>", methods=["GET"])
@login_required
def get_event_by_id(event_id):
    event = Event.query.get(event_id)
    validate_guest_status = filter(
        lambda guest: guest.guest_id == current_user.id, event.guests)
    if validate_guest_status or current_user.id in event.guests or current_user.id == event.organiser_id:
        return event.to_dict(current_user.id), 200
    else:
        return {'errors': ['Unauthorized']}, 401


@bp.route("/invited",  methods=["GET"])
@login_required
def get_events_invited():
    user = User.query.get(current_user.id)
    return [event_guest.event_to_dict(user.id)
            for event_guest in user.events_invited
            if event_guest.event.organiser_id != current_user.id]


@bp.route("", methods=["POST"])
@login_required
def post_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        calendar = Calendar.query.get(data['calendar_id'])
        if calendar.owner.id == current_user.id:
            event = Event(
                calendar_id=data['calendar_id'],
                organiser_id=data['organiser_id'],
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
            return event.to_dict(current_user.id), 201
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
        calendar = Calendar.query.get(data['calendar_id'])
        if calendar.owner.id == current_user.id:
            event = Event.query.get(event_id)
            event.calendar_id = data['calendar_id'],
            event.organiser_id = data['organiser_id'],
            event.title = data['title'],
            event.address = data['address'],
            event.description = data["description"],
            event.start_time = data["start_time"],
            event.end_time = data["end_time"],
            event.end_date = data["end_date"],
            event.recurrence = data['recurrence']
            db.session.commit()
            return event.to_dict(current_user.id), 200
        else:
            return {'errors': ['Unauthorized']}, 401
    return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("/<int:event_id>", methods=["PATCH"])
@login_required
def update_guest_permission(event_id):
    event = Event.query.get(event_id)
    data = request.json
    print(data, '-'*50)
    if event.organiser_id == current_user.id:
        event.guest_modify_event = data['guest_modify_event']
        event.guest_invite_others = data['guest_invite_others']
        event.guest_see_guest_list = data['guest_see_guest_list']
        db.session.commit()
        return event.to_dict(current_user.id), 200
    else:
        return {'errors': ['Unauthorized']}, 401


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


@bp.route("/<int:event_id>/guests", methods=["GET"])
@login_required
def get_event_guests(event_id):
    event = Event.query.get(event_id)
    if event.guest_see_guest_list or event.calendar.owner.id == current_user.id:
        return [guest.to_dict() for guest in event.guests]
    else:
        return {'errors': ['Unauthorized']}, 401


@bp.route("/<int:event_id>/guests", methods=["POST"])
@login_required
def add_event_guests(event_id):
    event = Event.query.get(event_id)
    old_guests = {guest.guest_id: guest for guest in event.guests}
    new_guests = request.json['guests']  # list
    new_guests = [int(guest_id) for guest_id in new_guests]

    for guest_id in new_guests:
        if guest_id not in old_guests:
            db.session.add(EventGuest(
                event=event,
                guest_id=guest_id,
            ))
    for guest_id in old_guests:  # dict
        if guest_id not in new_guests:
            db.session.delete(old_guests[guest_id])
    db.session.commit()
    return [guest.guest_to_dict() for guest in event.guests]
