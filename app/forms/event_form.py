from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms.fields import StringField, DateTimeField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Email, URL, NumberRange, Length
from app.models import User


class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    address = StringField('address')
    description = StringField('description')
    start = DateTimeField('start', validators=[DataRequired()])
    end = DateTimeField('end', validators=[DataRequired()])
    recurrence = IntegerField('recurrence', validators=[NumberRange(min=0)])
