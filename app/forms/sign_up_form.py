from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms.fields import StringField, FloatField, TextAreaField, SubmitField, URLField, EmailField, PasswordField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Email, URL, NumberRange, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    name = StringField(
        'Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email(), user_exists])
    password = PasswordField("Password", validators=[DataRequired()])
    profile_picture_url = URLField(
        "Profile picture URL",
        default=".plendar.png",
        validators=[URL()]
    )
