# from crypt import methods
from crypt import methods
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
