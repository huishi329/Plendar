from flask.cli import AppGroup
from .seed import seed_all, undo_all

from app.models.db import db

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    undo_all()
    seed_all()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_all()
    # Add other undo functions here
