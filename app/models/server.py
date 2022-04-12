from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session, backref
from alembic import op
from sqlalchemy.orm import Session
from .db import db



class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(Integer, primary_key=True)
    owner_id = db.Column(Integer, ForeignKey('users.id'), nullable=False,)
    server_picture = db.Column(String(2000))
    name = db.Column(String(100), nullable=False)
    topic = db.Column(String(100), nullable=False)
    description = db.Column(String(255), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    channels = relationship('Channel', backref='server', cascade="all,delete-orphan")

    vc_rooms = relationship('Vc', backref='server',cascade="all,delete-orphan")

    dm_rooms = relationship('ServerDmRoom', backref='server',cascade="all,delete-orphan")

    members = relationship('ServerMember', cascade='all, delete-orphan', backref='server')

    def to_dict(self):
        return {
            'id': self.id,
            'owner': {'id':self.owner.id, 'username': self.owner.username},
            'picture': self.server_picture,
            'name': self.name,
            'topic': self.topic,
            'description': self.description,
            'channels':[{'id': channel.id,'name':channel.name} for channel in self.channels],
            'message_rooms': [{'id':dm_room.id, 'members': [{'id':member.member.id, 'username': member.member.username} for member in dm_room.members]} for dm_room in self.dm_rooms],
            'members': [member.to_dict() for member in self.members]
        }

class ServerMember(db.Model):
    __tablename__ = 'serverMembers'

    id = db.Column(Integer, primary_key=True)
    server_id = db.Column(Integer, db.ForeignKey('servers.id', passive_deletes=True), nullable=False)
    user_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.server_id,
            'userId': self.user_id,
            'username':self.member.username
        }

class ServerDmRoom(db.Model):
    __tablename__ = 'serverDmRooms'

    id = db.Column(Integer, primary_key=True)
    owner_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    server_id = db.Column(Integer, ForeignKey('servers.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    members = relationship('ServerDmMember', backref='room',cascade="all, delete")
    messages = relationship('ServerDm', backref='room',cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'serverId': self.workspace_id,
            'members': [member.to_dict() for member in self.members],
            'messages': [message.to_dict() for message in self.messages]
    }

class ServerDmMember(db.Model):
    __tablename__ = 'serverDmMembers'

    id = db.Column(Integer, primary_key=True)
    room_id = db.Column(Integer, ForeignKey('serverDmRooms.id'), nullable=False)
    user_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'roomId': self.room_id,
            'userId': self.user_id,
            'username':self.member.username,
            'profilePicture': self.member.profile_picture,
            'serverId': self.room.server_id
    }

class ServerDm(db.Model):
    __tablename__ = 'serverDms'

    id = db.Column(Integer, primary_key=True)
    room_id = db.Column(Integer, ForeignKey('serverDmRooms.id'))
    sender_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    content = db.Column(String(2000), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.room.server_id,
            'roomId': self.room_id,
            'channelId': self.channel_id,
            'senderId': self.sender_id,
            'senderUsername':self.sender.username,
            'senderProfilePicture':self.sender.profile_picture,
            'content': self.content,
            'createdAt': self.created_at,
             'updatedAt': self.updated_at
        }
