from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms.fields import StringField, FloatField, TextAreaField, SubmitField, URLField, EmailField, PasswordField, BooleanField
from wtforms.validators import DataRequired, Email, URL, NumberRange, Length, ValidationError
from app.models import User


class SigninForm(FlaskForm):
    email = EmailField('email', validators=[DataRequired(), Email()])
    password = StringField('password', validators=[
                           DataRequired()])
