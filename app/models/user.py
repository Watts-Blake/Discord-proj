
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session
from alembic import op
from sqlalchemy.orm import Session

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_picture = db.Column(String(2000))
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    servers_owned = relationship('Server', backref='owner',cascade="all, delete")

    server_member = relationship('ServerMember', backref='member')

    channel_member = relationship('ChannelMember', backref='member')

    channel_messages_sent = relationship('ChannelMessage', backref='sender',cascade="all, delete")

    dm_channels_owned = relationship('Channel', backref='owner', cascade='all, delete')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
# {'users': {user.id:user.to_dict() for user in users}}
    def to_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'email':self.email,
        'profilePicture': self.profile_picture,
        'serverOwned': {server.id: server.to_resource_dict() for server in self.servers_owned},
        'serverMember': {member.server_id: member.server.to_dict() for member in self.server_member},
        # 'channelMessagesSent': {message.id: message.to_dict() for message in self.channel_messages_sent},
        'channelMember': {member.id: member.channel.to_resource_dict() for member in self.channel_member},
        'dmChannelsOwned': {dm_channel.id: dm_channel.to_resource_dict() for dm_channel in self.servers_owned},
    }
    def to_resource_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'email':self.email,
        'profilePicture': self.profile_picture,
    }

    def in_server(self, server_id):
        for server in self.server_member:
            if server.server_id == server_id:
                return True
        return False

    def in_channel(self, channel_id):

        for channel in self.channel_member:
            if channel.channel_id == channel_id:
                return True
        return False
