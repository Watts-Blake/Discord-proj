from flask_socketio import SocketIO, emit, join_room, leave_room, send
import os

# configure cors_allowed_origins
if os.environ.get('FLASK_ENV') == 'production':
    origins = [
        'http://diss-cord.herokuapp.com',
        'https://diss-cord.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)

# handle chat messages
@socketio.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()

def retrieve_active_users():
    emit('retrieve_active_users', broadcast=True)


@socketio.on('activate_user')
def on_active_user(data):
    user = data.get('username')
    emit('user_activated', {'user': user}, broadcast=True)


@socketio.on('deactivate_user')
def on_inactive_user(data):
    user = data.get('username')
    emit('user_deactivated', {'user': user}, broadcast=True)

@socketio.on('join_room')
def on_join(data):
    room = data['room']
    print('joinnning hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
    join_room(room)
    emit('open_room', {'room': room}, broadcast=True)

@socketio.on("leave_room")
def leave(data):
    print('leaving hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
    leave_room(data['room'])

@socketio.on('message')
def on_chat_sent(data):
    # data = req['message']
    print('data issssss hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', data)
    send({'message': data['message']}, room=data['room'],)
    # send({'id':data['id'],'channelId': data['channelId'] ,'content': data['content'], 'createdAt': data['createdAt'], 'updatedAt': data['updatedAt'], 'pinned': data['pinned'], 'senderUsername': data['senderUsername'], 'senderProfilePicture': data['senderProfilePicture']}, room=data['room'],)
