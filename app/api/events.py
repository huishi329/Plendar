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
        # print(data)
        user = User.query.get(current_user.id)
        calendar = list(filter(lambda calendar: calendar.name == data['calendar'], user.calendars))[0]
        event = Event(
            calendar=calendar,
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
    return {'errors': validation_errors_formatter(form, form.errors)}, 400
