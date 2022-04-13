
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    discord = User(username='Diss-cord Bot', email='discord@demo.com', password='diss-cord', profile_picture='https://www.svgrepo.com/show/331368/discord-v2.svg')
    db.session.add(discord)
    db.session.commit()
    aa = [ {'username': 'Blake', 'email': 'blake@demo.com', 'password': 'blake', 'profile_picture': ''},{'username': 'Yake', 'email': 'yake@demo.com', 'password': 'blake', 'profile_picture': ''},{'username': 'Ali', 'email': 'ali@demo.com', 'password': 'blake', 'profile_picture': ''}, {'username': 'Will', 'email': 'will@demo.com', 'password': 'blake', 'profile_picture': ''},{'username': 'Nick', 'email': 'nick@demo.com', 'password': 'blake', 'profile_picture': ''},{'username': 'ANT', 'email': 'ant@demo.com', 'password': 'blake', 'profile_picture': ''},{'username': 'Braxton', 'email': 'brax@demo.com', 'password': 'blake', 'profile_picture': ''}, ]

    for user in aa:
        new_user = User(username=user['username'], email=user['email'], password=user['password'], profile_picture=user['profile_picture'])
        db.session.add(new_user)
    akatsuki = [{'username': 'Itachi', 'email': 'itachi@demo.com', 'password': 'itachi', 'profile_picture': 'http://pm1.narvii.com/6689/fd31532cd6c492fe3f3d3e3e449336672a15c5ff_00.jpg'},{'username': 'Madara', 'email': 'madara@demo.com', 'password': 'itachi', 'profile_picture': 'https://www.pngitem.com/pimgs/m/122-1222641_beautiful-naruto-png-madara-funny-face-madara-uchiha.png'},{'username': 'Obito', 'email': 'obito@demo.com', 'password': 'itachi', 'profile_picture': 'https://i.pinimg.com/550x/2d/72/4a/2d724ac3c6db73eb619b4c6c957cdb60.jpg'},{'username': 'Nagato', 'email': 'nagato@demo.com', 'password': 'itachi', 'profile_picture': 'https://i.pinimg.com/736x/1a/9f/fb/1a9ffbfd168de648eef4c033061d7393--game-art-naruto.jpg'},{'username': 'Orochimaru', 'email': 'oruchimaru@demo.com', 'password': 'itachi', 'profile_picture': 'https://i.pinimg.com/236x/9b/06/68/9b06680c73cf145d20f9742bb7961779--naruto-pics-anime-naruto.jpg'}]

    for user in akatsuki:
        new_user = User(username=user['username'], email=user['email'], password=user['password'], profile_picture=user['profile_picture'])
        db.session.add(new_user)

    scouts = [ {'username': 'Eren', 'email': 'eren@demo.com', 'password': 'eren', 'profile_picture': 'https://cdn.vox-cdn.com/thumbor/rOYixubHAmop1DUJXdoEtzCuypY=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/22474122/Screenshotter_HuluWatch_2050.0.jpeg'},{'username': 'Levi', 'email': 'levi@demo.com', 'password': 'eren', 'profile_picture': 'https://i.pinimg.com/originals/d4/b3/3e/d4b33ef38b4dd76ac2acc1745327bf99.jpg'},{'username': 'Mikasa', 'email': 'mikasa@demo.com', 'password': 'eren', 'profile_picture': 'https://attackontitanstuff.com/wp-content/uploads/2021/06/new-attack-on-titan-mikasa-car-stickers-beauty-fine-decals-243-1.jpg'}, {'username': 'Armin', 'email': 'armin@demo.com', 'password': 'eren', 'profile_picture': 'https://i.pinimg.com/originals/1f/fa/8e/1ffa8e0a04d88e0dc0655340f606664c.png'},{'username': 'Erwin', 'email': 'erwin@demo.com', 'password': 'eren', 'profile_picture': 'https://i.pinimg.com/736x/5b/35/7d/5b357d14e5a6bcdfe1318accc19ef265.jpg'}, ]

    for user in scouts:
        new_user = User(username=user['username'], email=user['email'], password=user['password'], profile_picture=user['profile_picture'])
        db.session.add(new_user)



    demo = User(
        username='Demo', email='demo@demo.com', password='password', profile_picture='https://www.svgrepo.com/show/331368/discord-v2.svg')

    db.session.add(demo)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
