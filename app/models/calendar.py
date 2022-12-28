
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, BOOLEAN
from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Calendar(db.Model):
    __tablename__ = "calendars"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey(
        add_prefix_for_prod('users.id'), name='fk_calendar_owner_id'),
        nullable=False)
    name = Column(VARCHAR(254), nullable=False)
    description = Column(VARCHAR(200))
    timezone = Column(VARCHAR(254), nullable=False)

    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    users = relationship(
        "UserCalendar", back_populates="calendar", cascade="all, delete-orphan")
    owner = relationship("User", foreign_keys=[owner_id])
    events = relationship("Event", back_populates="calendar",
                          cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "description": self.description,
            "timezone": self.timezone,
        }
