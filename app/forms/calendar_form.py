from flask_wtf import FlaskForm
from wtforms.fields import StringField, DateTimeField, IntegerField, TimeField, DateField
from wtforms.validators import DataRequired, Length
from app.models import User
from datetime import datetime


class CalendarForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=254)])
    description = StringField('Description', validators=[Length(max=200)])
    timezone = StringField('Timezone', validators=[DataRequired()])
