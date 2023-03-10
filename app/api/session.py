from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import SignInForm, validation_errors_formatter
from app.models import User

bp = Blueprint("session", __name__, url_prefix="/session")


@bp.route("")
def restore():
    if current_user.is_authenticated:
        return current_user.to_dict()
    else:
        return {"message": "Not logged in"}, 400


@bp.route("", methods=["POST"])
def sign_in():
    if current_user.is_authenticated:
        return {"message": "Already logged in"}, 400

    form = SignInForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User.query.filter(User.email == form.email.data).first()
        if not user:
            return {"errors": {"Login failed":"We're sorry, there is an error with your email and/or password"}}, 400
        if not user.check_password(form.password.data):
            return {"errors": {"Login failed":"We're sorry, there is an error with your email and/or password"}}, 400
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("", methods=["DELETE"])
@login_required
def log_out():
    logout_user()
    return {"message": "Logged out"}


@bp.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
