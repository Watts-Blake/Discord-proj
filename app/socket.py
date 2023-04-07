from flask_socketio import SocketIO, emit, join_room, leave_room, send
from crypt import methods
from tkinter.messagebox import NO

from app.models import User, Server, ServerMember, Channel, ChannelMessage, db, ChannelMember
from flask_login import current_user, login_user, logout_user, login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
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


@socketio.on('send_message')
def on_chat_sent(data):

    new_message = ChannelMessage(
        channel_id= data['message']['channel_id'],
        sender_id = current_user.id,
        content = data['message']['content'],
        # picture = url

    )
    db.session.add(new_message)
    db.session.commit()
    sent_message = new_message.to_socket_dict()
    sent_message['createdAt'] = f"{new_message.to_dict()['createdAt']}"
    sent_message['updatedAt'] = f"{new_message.to_dict()['updatedAt']}"
    emit('send_message',{'message': sent_message}, room=data['room'])

@socketio.on('update_message')
def on_chat_sent(data):
    print('------------------------------->', data)
    updated_message = ChannelMessage.query.get(data['message']['message_id'])
    updated_message.content = data['message']['content']

    db.session.add(updated_message)
    db.session.commit()
    sent_updated_message = updated_message.to_socket_dict()
    sent_updated_message['createdAt'] = f"{updated_message.to_dict()['createdAt']}"
    sent_updated_message['updatedAt'] = f"{updated_message.to_dict()['updatedAt']}"
    # print('data issssss hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', sent_message['createdAt'])
    emit('update_message',{'message': sent_updated_message}, room=data['room'])
