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

    vc_channels = relationship('VoiceChannel', backref='server',cascade="all,delete-orphan")

    members = relationship('ServerMember', cascade='all, delete-orphan', backref='server')

    def to_dict(self):
        return {
            'id': self.id,
            'owner': {'id':self.owner.id, 'username': self.owner.username},
            'picture': self.server_picture,
            'name': self.name,
            'topic': self.topic,
            'description': self.description,
            'channels':{channel.id: channel.to_resource_dict() for channel in self.channels},
            'voiceChannels': {channel.id: channel.to_dict() for channel in self.vc_channels},
            'members': {member.id: member.member.to_resource_dict() for member in self.members}
        }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'owner': {'id':self.owner.id, 'username': self.owner.username},
            'picture': self.server_picture,
            'name': self.name,
            'topic': self.topic,
            'description': self.description,
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
            'username': self.member.username,
            'userId': self.member.id,
            'profilePicture': self.member.profile_picture,
            'email': self.member.email,
            'serverId': self.server_id,
        }
