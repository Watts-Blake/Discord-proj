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
        'http://diss-cord-0ccadd60a479.herokuapp.com',
        'https://diss-cord-0ccadd60a479.herokuapp.com'
    ]
else:
    origins = "*"

# initialize your socket instance
socketio = SocketIO(cors_allowed_origins=origins, logger=True, engineio_logger=True)

users={}
# handle chat messages
@socketio.on('connect')
@login_required
def on_connect():
    if current_user.is_authenticated:

        user = User.query.get(current_user.id)
        user.activity = 'online'
        db.session.commit()
        emit('connect', user.to_resource_dict(), broadcast=True)

    # retrieve_active_users()
@socketio.on('disconnect')
def on_disconnect():
    user = User.query.get(current_user.id)
    user.activity = 'offline'
    db.session.commit()
    emit('deactivate_user', user.to_resource_dict())


@socketio.on('retrieve_active_users')
@login_required
def retrieve_active_users(data):
    if current_user.is_authenticated:
        users = User.query.filter(User.activity != 'offline').all()
        print('i am running in the back', data)
        emit('retrieve_active_users', {user.id: user.to_resource_dict() for user in users}, room=data['room'])


@socketio.on('activate_user')
@login_required
def on_active_user():
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)
        user.activity = 'online'
        db.session.commit()
        users[user.id] = user.to_resource_dict()
        print('userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', user)
        return emit('activate_user', {'user': user.to_resource_dict(), 'currUserId': current_user.id}, broadcast=True)


@socketio.on('set_idle_user')
@login_required
def on_set_idle_user():
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)

        user.activity = 'idle'

        db.session.commit()
        users[user.id] = user.to_resource_dict()

        emit('set_idle_user', user.to_resource_dict(), broadcast=True)

@socketio.on('deactivate_user')
@login_required
def on_deactivate_user():
    if current_user.is_authenticated:
        user = User.query.get(current_user.id)
        user.activity = 'offline'
        db.session.commit()
        emit('deactivate_user', user.to_resource_dict(), broadcast=True)

@socketio.on('join_room')
@login_required
def on_join(data):
    if current_user.is_authenticated:
        room = data['room']
        join_room(room)
        emit('open_room', {'room': room})

@socketio.on("leave_room")
@login_required
def leave(data):
    if current_user.is_authenticated:
        leave_room(data['room'])


@socketio.on('send_message')
@login_required
def on_send_message(data):
    if current_user.is_authenticated:

        new_message = ChannelMessage(
            channel_id= data['message']['channel_id'],
            sender_id = current_user.id,
            content = data['message']['content'],

    )
        db.session.add(new_message)
        db.session.commit()
        sent_message = new_message.to_socket_dict()
        sent_message['createdAt'] = f"{new_message.to_dict()['createdAt']}"
        sent_message['updatedAt'] = f"{new_message.to_dict()['updatedAt']}"
        emit('send_message',{'message': sent_message}, room=data['room'])

@socketio.on('update_message')
@login_required
def on_update_message(data):
    if current_user.is_authenticated:
        updated_message = ChannelMessage.query.get(data['message']['message_id'])
        updated_message.content = data['message']['content']

        db.session.commit()
        sent_updated_message = updated_message.to_socket_dict()
        sent_updated_message['createdAt'] = f"{updated_message.to_dict()['createdAt']}"
        sent_updated_message['updatedAt'] = f"{updated_message.to_dict()['updatedAt']}"

        emit('update_message',{'message': sent_updated_message}, room=data['room'])

@socketio.on('delete_message')
@login_required
def on_delete_message(data):
    if current_user.is_authenticated:

        message_to_delete = ChannelMessage.query.get(data['message_id'])

        db.session.delete(message_to_delete)
        db.session.commit()

        emit('delete_message',{'messageId': message_to_delete.id}, room=data['room'])
