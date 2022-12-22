from app.models import db, User, Calendar, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_all():
    demo = User(
        name='Demo', email='demo@aa.io', password='password')
    marnie = User(
        name='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        name='bobbie', email='bobbie@aa.io', password='password')

    db.session.add_all([
        Calendar(users=[demo], name=demo.name, timezone='Canada/Pacific'),
        Calendar(users=[marnie], name=marnie.name, timezone='Canada/Pacific'),
        Calendar(users=[bobbie], name=bobbie.name, timezone='Canada/Pacific'),
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.users_calendars RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.calendars RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users_calendars")
        db.session.execute("DELETE FROM calendars")
        db.session.execute("DELETE FROM users")

    db.session.commit()
