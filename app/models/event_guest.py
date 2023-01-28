from .db import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, TIME, DATE, BOOLEAN
from sqlalchemy.sql import func


class EventGuest(db.Model):
    __tablename__ = "events_guests"

    event_id = Column(Integer, ForeignKey('events.id', name='fk_event_guest_event_id'),
                      primary_key=True)
    guest_id = Column(Integer, ForeignKey('users.id', name='fk_event_guest_guest_id'),
                      primary_key=True)
    status = Column(VARCHAR(10), nullable=False, server_default='awaiting')
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    event = relationship('Event', back_populates="guests")
    guest = relationship('User', back_populates="events_invited")

    def guest_to_dict(self):
        guest = self.guest.to_dict()
        guest["status"] = self.status
        return guest

    def event_to_dict(self, user_id):
        event = self.event.to_dict(user_id)
        event["status"] = self.status
        return event
