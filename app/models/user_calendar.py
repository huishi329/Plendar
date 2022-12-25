
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.types import Integer, DateTime, VARCHAR, BOOLEAN
from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserCalendar(db.Model):
    __tablename__ = "users_calendars"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id'), name='fk_user_calendar_user_id'),
        primary_key=True)
    calendar_id= Column(Integer, ForeignKey(add_prefix_for_prod('calendars.id'), name='fk_user_calendar_calendar_id'),
        primary_key=True)
    is_displayed= Column(BOOLEAN, server_default='True')
    created_at = Column(DateTime(timezone=True),
                        server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True),
                        server_default=func.now(), onupdate=func.now(),
                        nullable=False)

    user = relationship("User", back_populates="calendars")
    calendar = relationship("Calendar", back_populates="users")

    def to_dict(self):
        calendar = self.calendar.to_dict()
        calendar['is_displayed'] = self.is_displayed
        return calendar