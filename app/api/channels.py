# from crypt import methods
from crypt import methods
from tkinter.messagebox import NO
from flask import Blueprint, render_template, redirect, url_for, request
# from flask_login import login_required
# from sqlalchemy.orm import Session
from app.models import User, Server, ServerMember, Channel, ChannelMessage, db, ChannelMember
from flask_login import current_user, login_user, logout_user, login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
import json

channel_routes = Blueprint('channels', __name__, url_prefix='channels')


@channel_routes.route('/<int:channel_id>', methods=['GET', 'PUT', 'DELETE'])
def get_one_put_delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    if request.method == 'GET':

        return channel.to_dict()

    if request.method == 'PUT':
        name = request.json['name']
        diss_cord_bot_message = ChannelMessage.query.filter(ChannelMessage.channel_id == channel_id).filter(ChannelMessage.sender_id == 1).first()
        diss_cord_bot_message.content = f'Welcome to {channel.server.name}\'s Channel {name}'
        db.session.commit()

        channel.name = request.json['name']
        db.session.commit()
        return channel.to_dict()

    if request.method == 'DELETE':
        db.session.delete(channel)
        db.session.commit()
        return {'channelId': channel.id}

@channel_routes.route('/<int:channel_id>/messages', methods=['POST'])
def post_channel_message(channel_id):
    url = None
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]

    new_message = ChannelMessage(
        channel_id=channel_id,
        sender_id = request.form['senderId'],
        content = request.form['content'],
        picture = url

    )
    db.session.add(new_message)
    db.session.commit()
    return new_message.to_dict()

@channel_routes.route('/<int:channel_id>/messages/<int:message_id>', methods=['PUT', 'DELETE'])
def put_delete_message(channel_id, message_id):
    message = ChannelMessage.query.get(message_id)


    if request.method == 'PUT':

        url = message.picture
        if "image" in request.files:
            image = request.files["image"]
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}, 400
            if image != url:
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)
                url = upload["url"]

        message.content = request.form['content']
        message.picture = url
        # message.pinned = request.form['pinned']
        db.session.commit()
        return message.to_dict()

    if request.method == 'DELETE':
        print('right friggin here', message)
        db.session.delete(message)
        db.session.commit()
        return {'messageId': message.id}

@channel_routes.route('/<int:channel_id>/members', methods=['GET', 'POST'])
def get_all_or_post_to_channel_members(channel_id):

    server_general_channel = Channel.query.get(channel_id)

    print('after first query',server_general_channel.to_dict())

    if request.method == 'GET':
        print('before second querrrrrry')
        channel_members= ChannelMember.query.filter(ChannelMember.channel_id == channel_id).all()

        return {'channelMembers': {member.id:member.to_dict() for member in channel_members}}
    if request.method == 'POST':
        data = request.json
        joining_member = User.query.get(data['userId'])
        data = request.json
        member = ChannelMember(channel_id=channel_id, user_id=data['userId'])
        db.session.add(member)


        first_message = ChannelMessage(channel_id=channel_id, sender_id=1, content=f'👋{joining_member.username} has slid into the channel')
        db.session.add(first_message)
        db.session.commit()
        channel = Channel.query.get(channel_id)

        return {'member':member.to_dict(), 'channel': channel.to_dict()}

@channel_routes.route('/<int:channel_id>/members/<int:member_id>', methods=['DELETE'])
def delete_server_member(channel_id, member_id):
    channel = Channel.query.get(channel_id)
    member = ChannelMember.query.get(member_id)
    db.session.delete(member)
    leaving_message = ChannelMessage(channel_id=channel_id, sender_id=1, content=f'😭 {member.member.username} has left the channel')
    db.session.add(leaving_message)
    db.session.commit()
    return {'memberId': member_id, 'channelId': channel.id }
