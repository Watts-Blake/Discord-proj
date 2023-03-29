from app.models import db, Channel, ChannelMessage, ChannelMember




def seed_channels():
    channels = [{'name': 'General', 'server_id': 1},{'name': '2021-11-15-online', 'server_id': 1},{'name': '2021-11-15-online-questions', 'server_id': 1},{'name': 'General', 'server_id': 2},{'name': 'NineTails', 'server_id': 2},{'name': 'Itachi SuS?', 'server_id': 2},{'name': 'General', 'server_id': 3},{'name': 'MoM?', 'server_id': 3},{'name': 'Yaegerists', 'server_id': 3}]
    for channel in channels:
        new_channel = Channel(name=channel['name'], server_id=channel['server_id'])
        db.session.add(new_channel)

    db.session.commit()

def seed_dm_channels():
    channels = [{'dm_channel':True,'owner_id': 2}]
    for channel in channels:
        new_channel = Channel(owner_id=channel['owner_id'], dm_channel=channel['dm_channel'])
        db.session.add(new_channel)

    db.session.commit()

def seed_channel_members():
    channel_members = [{'channel_id': 10, 'user_id': 2}, {'channel_id': 10, 'user_id': 19}]

    for member in channel_members:
        new_member = ChannelMember(channel_id=member['channel_id'], user_id=member['user_id'])
        db.session.add(new_member)
    db.session.commit()

def undo_channel_members():
    db.session.execute('TRUNCATE channelMembers RESTART IDENTITY CASCADE;')
    db.session.commit()


def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_channel_messages():
    # i === channels
    for i in range(1, 10):
        channel = Channel.query.get(i)
        if channel.name == 'General':
            message = ChannelMessage(channel_id=i, sender_id=1, content=f'Welcome to {channel.server.name}\'s Server')
            db.session.add(message)
        else:
            message = ChannelMessage(channel_id=i, sender_id=1, content=f'Welcome to {channel.server.name}\'s Channel {channel.name}')
            db.session.add(message)
        #  x === users
        for x in range(2, 19):
                # users 2-3 channels 1-3
            if x < 9 and i < 4:
                message = ChannelMessage(channel_id=i, sender_id=x, content='test')
                db.session.add(message)
                # users 9 - 13 channels 4-6
            elif (x >= 9 and x < 14) and i <= 6 and i > 3:
                message = ChannelMessage(channel_id=i, sender_id=x, content='test')
                db.session.add(message)
                # users 13 - 18  channels 7-9
            elif (x > 13 and x < 19) and i <= 9 and i > 6:
                message = ChannelMessage(channel_id=i, sender_id=x, content='test')
                db.session.add(message)

        # message = ChannelMessage(channel_id=i, sender_id=18, content='test')
        # db.session.add(message)
    message_from_me = ChannelMessage(channel_id=10, sender_id=2, content="Hello, Thank you for visiting Diss-cord, an on going discord clone project, if you have any questions, feel free to message me here. If you'd like to know more about the project or myself feel free to click the github, or linked icons within the left navbar.")
    db.session.add(message_from_me)
    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channelMessages RESTART IDENTITY CASCADE;')
    db.session.commit()
