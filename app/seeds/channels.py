from app.models import channel, db, Channel, ChannelMessage




def seed_channels():
    channels = [{'name': 'General', 'server_id': 1},{'name': '2021-11-15-online', 'server_id': 1},{'name': '2021-11-15-online-questions', 'server_id': 1},{'name': 'General', 'server_id': 2},{'name': 'NineTails', 'server_id': 2},{'name': 'Itachi SuS?', 'server_id': 2},{'name': 'General', 'server_id': 3},{'name': 'MoM?', 'server_id': 3},{'name': 'Yaegerists', 'server_id': 3}]
    for channel in channels:
        new_channel = Channel(name=channel['name'], server_id=channel['server_id'])
        db.session.add(new_channel)

    db.session.commit()




def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

def seed_channel_messages():
    for i in range(1, 10):
        channel = Channel.query.get(i)
        if channel.name == 'General':
            message = ChannelMessage(channel_id=i, sender_id=1, content=f'Welcome to {channel.server.name}\'s Server')
            db.session.add(message)
        else:
            message = ChannelMessage(channel_id=i, sender_id=1, content=f'Welcome to {channel.server.name}\'s Channel {channel.name}')
            db.session.add(message)
        for x in range(2, 19):
            if x < 9 and i < 4:
                message = ChannelMessage(channel_id=i, sender_id=x, content='test')
                db.session.add(message)
            elif (x >= 9 and x < 14) and i < 7 and i > 3:
                message = ChannelMessage(channel_id=i, sender_id=x, content='test')
                db.session.add(message)
            elif (x >= 13 and x < 19) and i <= 9 and i > 6:
                message = ChannelMessage(channel_id=i, sender_id=x, content='test')
                db.session.add(message)

        message = ChannelMessage(channel_id=i, sender_id=18, content='test')
        db.session.add(message)
    db.session.commit()

def undo_channel_messages():
    db.session.execute('TRUNCATE channelMessages RESTART IDENTITY CASCADE;')
    db.session.commit()
