from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR
from sqlalchemy.sql import func


class Event(db.Model):
    __tablename__ = "events"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)

    calendar_id = Column(Integer, ForeignKey(
        add_prefix_for_prod('calendars.id'), name='fk_event_calendar_id'),
        nullable=False)
    title = Column(VARCHAR, server_default='(No title)')
    address = Column(VARCHAR(254))
    description = Column(VARCHAR)
    start = Column(DateTime(timezone=True), nullable=False)
    end = Column(DateTime(timezone=True), nullable=False)
    reccurence = Column(Integer)

    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    calendar = db.relationship('Calendar', back_populates="calendar")

    def to_dict(self):
        return {
            "id": self.id,
            # "calendar_id": self.calendar_id,
            "title": self.title,
            "address": self.address,
            "description": self.description,
            "start": self.start,
            "end": self.end,
            "reccurence": self.reccurence
        }
