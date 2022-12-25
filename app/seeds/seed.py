from app.models import db, User, Calendar, Event, environment, SCHEMA
from datetime import time, datetime

# Adds a demo user, you can add other users here if you want
def seed_all():
    demo = User(
        name='Demo', email='demo@aa.io', password='password')
    marnie = User(
        name='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        name='bobbie', email='bobbie@aa.io', password='password')

    demo_work_calendar = Calendar(owner=demo, users=[demo, marnie, bobbie], name='Demo - work', timezone='Canada/Pacific')
    demo_calendar = Calendar(owner=demo, users=[demo], name=demo.name, timezone='Canada/Pacific')
    marnie_calendar = Calendar(owner=marnie, users=[marnie], name=marnie.name, timezone='Canada/Pacific')
    bobbie_calendar = Calendar(owner=bobbie, users=[bobbie], name=bobbie.name, timezone='Canada/Pacific')

    db.session.add_all([
        Event(
            calendar=demo_work_calendar,
            title='Stand Up',
            start_time=datetime(2022, 12, 19, 8, 0),
            end_time=datetime(2022, 12, 19, 8, 15),
            end_date=datetime.max,
            recurrence=1,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Project Time: Solo Full Stack',
            start_time=datetime(2022, 12, 19, 8, 15),
            end_time=datetime(2022, 12, 19, 11, 15),
            end_date=datetime.max,
            recurrence=1,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Lunch',
            start_time=datetime(2022, 12, 19, 11, 15),
            end_time=datetime(2022, 12, 19, 12, 30),
            end_date=datetime.max,
            recurrence=1,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Peer Review',
            start_time=datetime(2022, 12, 19, 12, 30),
            end_time=datetime(2022, 12, 19, 13, 30),
            end_date=datetime.max,
            recurrence=1,
        ),
        Event(
            calendar=demo_work_calendar,
            title='Project Time: Solo Full Stack',
            start_time=datetime(2022, 12, 19, 13, 30),
            end_time=datetime(2022, 12, 19, 17, 00),
            end_date=datetime.max,
            recurrence=1,
        ),
        Event(
            calendar=demo_calendar,
            title='Viniyasa | Yoga with Young Ji',
            start_time=datetime(2022, 12, 4, 11, 30),
            end_time=datetime(2022, 12, 4, 12, 30),
            end_date=datetime.max,
            recurrence=7,
        ),
    ])


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_all():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.events RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users_calendars RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.calendars RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM events")
        db.session.execute("DELETE FROM users_calendars")
        db.session.execute("DELETE FROM calendars")
        db.session.execute("DELETE FROM users")

    db.session.commit()
