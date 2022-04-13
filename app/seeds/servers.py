from app.models import db, Server



# Adds a demo user, you can add other users here if you want
def seed_servers():
    servers = [{'owner_id': 12, 'server_picture': 'https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png', 'name': 'App Academy', 'topic': 'Software Development', 'description': 'This is a discord server for all a/A attendees to gather and communicate.'}, {'owner_id': 2, 'server_picture': 'https://1000logos.net/wp-content/uploads/2021/12/Akatsuki-Logo.png', 'name': 'Akatsuki', 'topic': 'Finding Jinchuriki\'s ', 'description': 'This is a discord server for all Akatsuki members to collaborate on finding Jinchuriki\'s.'}, {'owner_id': 7, 'server_picture': 'https://i.pinimg.com/originals/62/0e/10/620e10c8e01f0cebc6c1ebddea68e057.jpg', 'name': 'Scouts', 'topic': 'Stopping the Attack on Paradis Island', 'description': 'This is a discord server for all members of the Scouts regiment collaborate on future Titan attacks.'}]
    for server in servers:
        new_server = Server(owner_id=server['owner_id'], server_picture=server['server_picture'], name=server['name'], topic=server['topic'], description=server['description'])
        db.session.add(new_server)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
