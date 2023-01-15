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
    is_organiser = Column(BOOLEAN, server_default='False', nullable=False)
    status = Column(BOOLEAN)
    modify_event = Column(BOOLEAN, server_default='False', nullable=False)
    invite_others = Column(BOOLEAN, server_default='True', nullable=False)
    see_guest_list = Column(BOOLEAN, server_default='True', nullable=False)

    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    event = relationship('Event', back_populates="guests")

    def to_dict(self):
        return {
            "id": self.id,
        }
