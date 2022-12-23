from flask import Blueprint, request
from flask_login import login_required, current_user, login_user, logout_user
from app.forms import SignUpForm, validation_errors_formatter
from app.models import db, User


bp = Blueprint("users", __name__, url_prefix="/users")


@bp.route("",  methods=["POST"])
def sign_up():
    if current_user.is_authenticated:
        return {"message": 'User has logged in'}
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        if User.query.filter(User.email == data['email']).one_or_none():
            return {'errors': {'email': "Email has been registered."}}, 400
        user = User(
            name=data['name'],
            email=data['email'],
            password=data['password'],
            profile_picture_url=data['profile_picture_url']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict(), 201
    return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("/<user_id>", methods=["PUT"])
@login_required
def update_user(user_id):
    if int(user_id) != current_user.id:
        return {'errors': ['Must own account to update it']}, 401
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        if User.query.filter(User.email == data['email']).one_or_none():
            return {'errors': {'email': "Email has been registered."}}, 400
        user = User.query.get(current_user.id)
        user.name = data['name']
        user.email = data['email']
        user.password = data['password']
        user.profile_picture_url = data['profile_picture_url']

        db.session.commit()
        return user.to_dict(), 200
    return {'errors': validation_errors_formatter(form, form.errors)}, 400


@bp.route("/current", methods=["DELETE"])
@login_required
def delete_user():
    """For debugging"""
    db.session.delete(current_user)
    db.session.commit()
    logout_user()
    return "Deleted user and logged out"
