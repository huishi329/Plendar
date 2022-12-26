from flask import Blueprint
from . import calendars, session, users, events, users_calendars

bp = Blueprint("api", __name__, url_prefix="/api")

bp.register_blueprint(session.bp)
bp.register_blueprint(users.bp)
bp.register_blueprint(calendars.bp)
bp.register_blueprint(events.bp)
bp.register_blueprint(users_calendars.bp)
