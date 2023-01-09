
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, BOOLEAN
from sqlalchemy.sql import func
from .db import db


class Calendar(db.Model):
    __tablename__ = "calendars"

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey('users.id', name='fk_calendar_owner_id'),
                      nullable=False)
    name = Column(VARCHAR(254), nullable=False)
    description = Column(VARCHAR(200))
    timezone = Column(VARCHAR(254), nullable=False)
    is_default = Column(BOOLEAN, nullable=False, server_default="False")

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
            "is_default": self.is_default,
            "owner_id": self.owner_id,
            "name": self.name,
            "description": self.description,
            "timezone": self.timezone,
        }
