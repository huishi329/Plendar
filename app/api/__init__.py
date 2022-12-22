from flask import Blueprint
from . import calendars, session, users

bp = Blueprint("api", __name__, url_prefix="/api")

bp.register_blueprint(session.bp)
bp.register_blueprint(users.bp)
bp.register_blueprint(calendars.bp)