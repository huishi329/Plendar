from .db import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, BOOLEAN
from sqlalchemy.sql import func


class Event(db.Model):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True)

    calendar_id = Column(Integer, ForeignKey('calendars.id', name='fk_event_calendar_id'),
                         nullable=False)
    organiser_id = Column(Integer, ForeignKey('users.id', name='fk_event_organiser_id'),
                          nullable=False)
    title = Column(VARCHAR, server_default='(No title)')
    address = Column(VARCHAR)
    description = Column(VARCHAR)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)
    recurrence = Column(Integer, server_default="0", nullable=False)
    guest_modify_event = Column(
        BOOLEAN, server_default='False', nullable=False)
    guest_invite_others = Column(
        BOOLEAN, server_default='True', nullable=False)
    guest_see_guest_list = Column(
        BOOLEAN, server_default='True', nullable=False)
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    calendar = relationship('Calendar', back_populates="events")
    guests = relationship(
        "EventGuest", back_populates="event", cascade="all, delete-orphan")
    organiser = relationship('User', foreign_keys=[organiser_id])

    def to_dict(self, user_id):
        event = {
            "id": self.id,
            "calendar_id": self.calendar_id,
            "organiser": self.organiser.to_dict(),
            "title": self.title,
            "address": self.address,
            "description": self.description,
            "start_time": self.start_time.strftime('%Y-%m-%d %H:%M:%S'),
            "end_time": self.end_time.strftime('%Y-%m-%d %H:%M:%S'),
            "end_date": self.end_date.strftime('%Y-%m-%d %H:%M:%S'),
            "recurrence": self.recurrence,
            "guest_modify_event": self.guest_modify_event,
            "guest_invite_others": self.guest_invite_others,
            "guest_see_guest_list": self.guest_see_guest_list
        }
        if (self.guest_see_guest_list or user_id == self.organiser_id) and len(self.guests) > 0:
            event["guests"] = {guest.guest_id: guest.guest_to_dict()
                               for guest in self.guests}
        return event
