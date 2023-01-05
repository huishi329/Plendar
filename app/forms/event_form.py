from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms.fields import StringField, DateTimeField, IntegerField, TimeField, DateField
from wtforms.validators import DataRequired, ValidationError, Email, URL, NumberRange, Length
from app.models import User
from datetime import datetime


def check_end_time(form, field):
    # check if end time is set after the start time
    end_time = field.data
    start_time = form.start_time.data
    if end_time < start_time:
        raise ValidationError("End time should be set after start time.")


class EventForm(FlaskForm):
    title = StringField('Title')
    address = StringField('Address')
    description = StringField('Description')
    start_time = DateTimeField('Start time', validators=[DataRequired()])
    end_time = DateTimeField('End time', validators=[
                             DataRequired(), check_end_time])
    end_date = DateTimeField('End date', validators=[DataRequired()])
    recurrence = IntegerField('Recurrence', default=0)
    calendar_id = IntegerField('Calendar', validators=[DataRequired()])
