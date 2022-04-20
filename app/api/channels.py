# from crypt import methods
from crypt import methods
from tkinter.messagebox import NO
from flask import Blueprint, render_template, redirect, url_for, request
# from flask_login import login_required
# from sqlalchemy.orm import Session
from app.models import User, Server, ServerMember, Channel, ChannelMessage, db
from flask_login import current_user, login_user, logout_user, login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
import json

channel_routes = Blueprint('channels', __name__, url_prefix='channels')


@channel_routes.route('/<int:channel_id>', methods=['GET', 'PUT', 'DELETE'])
def get_one_put_delete_channel(channel_id):
    channel = Channel.query.get(channel_id)
    if request.method == 'GET':
        print('hereeeeeeeeee', channel.to_dict())
        return channel.to_dict()

    if request.method == 'PUT':

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
def put_delete_message(message_id):
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
        message.pinned = request.form
        db.session.commit()
        return message.to_dict()

    if request.method == 'DELETE':
        db.session.delete(message)
        db.session.commit()
        return {'messageId': message.id}
