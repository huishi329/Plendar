from flask_wtf import FlaskForm
from flask_wtf.file import FileField
from wtforms.fields import StringField, SubmitField, URLField, EmailField, PasswordField, BooleanField
from wtforms.validators import DataRequired, ValidationError, Email, URL, NumberRange, Length
from flask_login import current_user
from app.models import User

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        if user.id != current_user.id:
            raise ValidationError('Email address is already in use.')


class EditProfileForm(FlaskForm):
    name = StringField(
        'Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired(), Email()])
    profile_picture_url = URLField(
        "Profile picture URL",
        default=".plendar.png",
        validators=[URL()]
    )
