# from crypt import methods
from crypt import methods
from flask import Blueprint, render_template, redirect, url_for, request
# from flask_login import login_required
# from sqlalchemy.orm import Session
from app.models import User, Server, ServerMember, Channel, ChannelMessage, db
from flask_login import current_user, login_user, logout_user, login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename
import json

servers_routes = Blueprint('servers', __name__, url_prefix='servers')
@servers_routes.route('/', methods=['GET', 'POST'])
def get_all_or_post_to_servers():
# --------------------------------------------------------get all servers
    if request.method == 'GET':
        servers= Server.query.get().all()

        return {'servers': server.to_resource_dict() for server in servers}
#---------------------------------------------------------create new server
    if request.method == 'POST':
        # print('right here you fucking wombat', request.files['image'])
        url = "https://www.svgrepo.com/show/331368/discord-v2.svg"

        if "image" in request.files:
            image = request.files["image"]

            image.filename = get_unique_filename(image.filename)
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}, 400
            upload = upload_file_to_s3(image)
            url = upload["url"]
        server = Server(owner_id=current_user.id, server_picture=url, name=request.form['name'], )
        # topic=request.form['topic'], description=request.form['description'] )
        db.session.add(server)
        db.session.commit()

        server_member = ServerMember(server_id=server.id, user_id=server.owner_id)
        db.session.add(server_member)

        channel = Channel(name='General', server_id=server.id)
        db.session.add(channel)
        db.session.commit()

        first_message = ChannelMessage(channel_id=channel.id, sender_id=1, content=f'Welcome to {server.name}\'s Server')
        db.session.add(first_message)
        db.session.commit()

        return server.to_dict()

@servers_routes.route('/<int:server_id>', methods=['GET', 'PUT', 'DELETE'])
def get_one__put_delete_server(server_id):
    server = Server.query.get(server_id)
    if request.method == 'GET':
        return server.to_dict()

    if request.method == 'PUT':
        url = server.server_picture

        if "image" in request.files:
            image = request.files["image"]

            image.filename = get_unique_filename(image.filename)
            if not allowed_file(image.filename):
                return {"errors": "file type not permitted"}, 400
            upload = upload_file_to_s3(image)
            url = upload["url"]
        server.name = request.form['name']
        server.server_picture = url
        db.session.commit()
        return server.to_dict()

    if request.method == 'DELETE':
        db.session.delete(server)
        db.session.commit()
        return {'serverId': server.id}

@servers_routes.route('/<int:server_id>/members', methods=['GET', 'POST'])
def get_all_or_post_to_server_members(server_id):
    print('beforeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
    server_general_channel = Channel.query.filter(Channel.server_id == server_id).filter(Channel.name == 'General').first()

    print('after first query',server_general_channel.to_dict())

    if request.method == 'GET':
        print('before second querrrrrry')
        server_members= ServerMember.query.filter(ServerMember.server_id == server_id).all()
        print('after second querrrrrry', server_members)

        return {'serverMembers': {member.id:member.to_dict() for member in server_members}}
    if request.method == 'POST':
        data = request.json
        joining_member = User.query.get(data['userId'])
        data = request.json
        member = ServerMember(server_id=data['serverId'], user_id=data['userId'])
        db.session.add(member)

        first_message = ChannelMessage(channel_id=server_general_channel.id, sender_id=1, content=f'👋{joining_member.username} has slid into the server')
        db.session.add(first_message)
        db.session.commit()

        return member.to_dict()

@servers_routes.route('/<int:server_id>/members/<int:memberId>', methods=['DELETE'])
def delete_server_member(server_id, member_id):
    server_general_channel = Channel.query.filter(Channel.server_id == server_id, Channel.name == 'General').get()
    member = ServerMember.query.get(member_id)
    db.session.delete(member)
    leaving_message = ChannelMessage(channel_id=server_general_channel.id, sender_id=1, content=f'😭 {member.username} has left the server')
    db.session.add(leaving_message)
    db.session.commit()
    return {'memberId': member_id}

@servers_routes.route('/<int:server_id>/channels', methods=['GET', 'POST'])
def get_all_or_post_to_channel(server_id):
    if request.method == 'GET':
        channels= Channel.query.filter(Channel.server_id == server_id).all()

        return {'channels': {channel.id:channel.to_resource_dict() for channel in channels}}
    if request.method == 'POST':
        data = request.json
        channel = Channel(name=data['name'], server_id=data['serverId'])
        db.session.add(channel)
        db.session.commit()

        first_message = ChannelMessage(channel_id=channel.id, sender_id=1, content=f'Welcome to {channel.server.name}\'s Channel {channel.name}')
        db.session.add(first_message)

        db.session.commit()
        return channel.to_dict()

@servers_routes.route('/<int:server_id>/channels/<int:channel_id>', methods=['GET', 'PUT', 'DELETE'])
def get_one__put_delete_channel(server_id, channel_id):
    channel = Channel.query.get(channel_id)
    if request.method == 'GET':
        return channel.to_dict()

    if request.method == 'PUT':

        channel.name = request.json['name']
        db.session.commit()
        return channel.to_dict()

    if request.method == 'DELETE':
        db.session.delete(channel)
        db.session.commit()
        return {'channelId': channel.id}






# @bp.route('/<int:workspace_id>/search/<string:parameters>/<string:keyword>')
# def search(workspace_id, parameters, keyword):
#     available_channels = db.session.query(Channel).filter(Channel.workspace_id == workspace_id)
#     available_rooms = db.session.query(DirectMessageRoom).filter(DirectMessageRoom.workspace_id == workspace_id)

#     my_user = User.query.get(current_user.id)

#     channel_ids = []
#     room_ids = []

#     for available_channel in available_channels:
#         if my_user.in_channel(available_channel.id):
#             channel_ids.append(available_channel.id)
#     for available_room in available_rooms:
#         if my_user.in_dm_room(available_room.id):
#             room_ids.append(available_room.id)

#     channels = []
#     people = []
#     messages=[]
#     many = []
#     result = []

#     if "channels" in parameters:
#         channels = Channel.query.filter(Channel.name.ilike(f"%{keyword}%"), Channel.workspace_id == workspace_id)
#         result = result + [channel.to_dict() for channel in channels]
#     if "people" in parameters:
#         people = db.session.query(WorkspaceMember.user_id).filter(WorkspaceMember.workspace_id == workspace_id).all()
#         if keyword == "no_specific_member":
#             new_people = []
#             for member_id in people:
#                 check = db.session.query(User).filter(User.id == member_id[0], User.id != current_user.id).first()
#                 if check:
#                     new_people.append(check.to_dict())
#             people = new_people
#         else:
#             new_people = []
#             for member_id in people:
#                 check = db.session.query(User).filter(User.id == member_id[0], User.username.ilike(f"%{keyword}%")).first()
#                 if check:
#                     new_people.append(check.to_dict())
#             people = new_people
#         result = result + [user for user in people]
#     if "messages" in parameters:
#         messages = db.session.query(Message).filter(Message.content.ilike(f"%{keyword}%"))
#         result = result + [message.to_dict() for message in messages if message.channel_id in channel_ids or message.room_id in room_ids]
#     if 'nothing' in parameters:
#         # channels
#         channels = db.session.query(Channel).filter(Channel.name.ilike(f"%{keyword}%"), Channel.workspace_id == workspace_id)
#         result = result + [channel.to_dict() for channel in channels]
#         # people
#         people = db.session.query(WorkspaceMember.user_id).filter(WorkspaceMember.workspace_id == workspace_id).all()
#         new_people = []
#         for member_id in people:
#             check = db.session.query(User).filter(User.id == member_id[0], User.username.ilike(f"%{keyword}%")).first()
#             if check:
#                 new_people.append(check.to_dict())
#         people = new_people
#         result = result + [user for user in people]
#         # messages
#         messages = db.session.query(Message).filter(Message.content.ilike(f"%{keyword}%"))
#         result = result + [message.to_dict() for message in messages if message.channel_id in channel_ids or message.room_id in room_ids]

#     return { 'result': result }
