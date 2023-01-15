from .db import db
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, TIME, DATE
from sqlalchemy.sql import func


class Event(db.Model):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True)

    calendar_id = Column(Integer, ForeignKey('calendars.id', name='fk_event_calendar_id'),
                         nullable=False)
    title = Column(VARCHAR, server_default='(No title)')
    address = Column(VARCHAR)
    description = Column(VARCHAR)
    start_time = Column(DateTime(timezone=True), nullable=False)
    end_time = Column(DateTime(timezone=True), nullable=False)
    end_date = Column(DateTime(timezone=True), nullable=False)
    recurrence = Column(Integer, server_default="0", nullable=False)

    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    calendar = relationship('Calendar', back_populates="events")
    guests = relationship(
        "EventGuest", back_populates="event", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "calendar_id": self.calendar_id,
            "title": self.title,
            "address": self.address,
            "description": self.description,
            "start_time": self.start_time.strftime('%Y-%m-%d %H:%M:%S'),
            "end_time": self.end_time.strftime('%Y-%m-%d %H:%M:%S'),
            "recurrence": self.recurrence,
            "end_date": self.end_date.strftime('%Y-%m-%d %H:%M:%S')
        }
