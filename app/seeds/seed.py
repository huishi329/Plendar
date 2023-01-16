from app.models import db, User, Calendar, Event, UserCalendar, EventGuest
from datetime import time, datetime

# Adds a demo user, you can add other users here if you want


def seed_all():
    demo = User(
        name='Demo', email='demo@aa.io', password='password')
    marnie = User(
        name='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        name='bobbie', email='bobbie@aa.io', password='password')

    demo_calendar = Calendar(owner=demo, name=demo.name,
                             timezone='Canada/Pacific', is_default=True)
    demo_work_calendar = Calendar(
        owner=demo, name='Demo - work', timezone='Canada/Pacific')
    marnie_calendar = Calendar(
        owner=marnie, name=marnie.name, timezone='Canada/Pacific', is_default=True)
    bobbie_calendar = Calendar(
        owner=bobbie, name=bobbie.name, timezone='Canada/Pacific', is_default=True)
    yoga_event = Event(
        calendar=demo_calendar,
        organiser=demo,
        title='Viniyasa | Yoga with Ellen',
        start_time=datetime(2022, 12, 4, 11, 30),
        end_time=datetime(2022, 12, 4, 12, 30),
        end_date=datetime.max,
        recurrence=7,
    )

    db.session.add_all([
        UserCalendar(calendar=demo_work_calendar, user=demo),
        UserCalendar(calendar=demo_work_calendar, user=bobbie),
        UserCalendar(calendar=demo_work_calendar, user=marnie),
        UserCalendar(calendar=demo_calendar, user=demo),
        UserCalendar(calendar=marnie_calendar, user=marnie),
        UserCalendar(calendar=bobbie_calendar, user=bobbie),

        Event(
            calendar=demo_work_calendar,
            title='Stand Up',
            organiser=demo,
            start_time=datetime(2022, 12, 19, 8, 0),
            end_time=datetime(2022, 12, 19, 8, 15),
            end_date=datetime.max,
            recurrence=5,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Project Time: Solo Full Stack',
            organiser=demo,
            start_time=datetime(2022, 12, 19, 8, 15),
            end_time=datetime(2022, 12, 19, 11, 15),
            end_date=datetime.max,
            recurrence=5,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Lunch',
            organiser=demo,
            start_time=datetime(2022, 12, 19, 11, 15),
            end_time=datetime(2022, 12, 19, 12, 30),
            end_date=datetime.max,
            recurrence=5,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Peer Review',
            organiser=demo,
            start_time=datetime(2022, 12, 19, 12, 30),
            end_time=datetime(2022, 12, 19, 13, 30),
            end_date=datetime.max,
            recurrence=5,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Project Time: Solo Full Stack',
            organiser=demo,
            start_time=datetime(2022, 12, 19, 13, 30),
            end_time=datetime(2022, 12, 19, 17, 00),
            end_date=datetime.max,
            recurrence=5,
        ),
        EventGuest(
            event=yoga_event,
            guest=demo,
            status='Yes',
        ),
        EventGuest(
            event=yoga_event,
            guest=marnie,
        ),
    ])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_all():
    db.session.execute(
        f"TRUNCATE table events RESTART IDENTITY CASCADE;")
    db.session.execute(
        f"TRUNCATE table users_calendars RESTART IDENTITY CASCADE;")
    db.session.execute(
        f"TRUNCATE table calendars RESTART IDENTITY CASCADE;")
    db.session.execute(
        f"TRUNCATE table users RESTART IDENTITY CASCADE;")

    db.session.execute("DELETE FROM events")
    db.session.execute("DELETE FROM users_calendars")
    db.session.execute("DELETE FROM calendars")
    db.session.execute("DELETE FROM users")

    db.session.commit()
