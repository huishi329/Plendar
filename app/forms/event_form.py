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
    title = StringField('title')
    address = StringField('address')
    description = StringField('description')
    start_time = TimeField('start time', validators=[DataRequired()])
    end_time = TimeField('end time', validators=[DataRequired(), check_end_time])
    end_date = DateTimeField('end date', validators=[DataRequired()])
    recurrence = IntegerField('recurrence', default=0)
    calendar = StringField('calendar', validators=[DataRequired()])
