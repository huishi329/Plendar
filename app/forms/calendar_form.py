from flask_wtf import FlaskForm
from wtforms.fields import StringField, DateTimeField, IntegerField, TimeField, DateField
from wtforms.validators import DataRequired, ValidationError, Email, URL, NumberRange, Length
from app.models import User
from datetime import datetime


class CalendarForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description')
    timezone = StringField('timezone', validators=[DataRequired()])
