
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, BOOLEAN
from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod

users_calendars = Table(
    'users_calendars',
    db.Model.metadata,
    Column('user_id', Integer, ForeignKey(add_prefix_for_prod('users.id'), name='fk_user_calendar_user_id'),
        primary_key=True),
    Column('calendar_id', Integer, ForeignKey(add_prefix_for_prod('calendars.id'), name='fk_user_calendar_calendar_id'),
        primary_key=True),
)

if environment == "production":
    users_calendars.schema = SCHEMA

class Calendar(db.Model):
    __tablename__ = "calendars"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)

    name = Column(VARCHAR(254), server_default='(No title)')
    description = Column(VARCHAR(200))
    timezone = Column(VARCHAR(254))
    is_active = Column(BOOLEAN, server_default="True")

    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    users = relationship("User", secondary=users_calendars, back_populates="calendars")
    events = relationship("Event", back_populates="calendar")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "timezone": self.timezone,
            "is_active": self.is_active,
            "users": [user.to_dict() for user in self.users]
        }
