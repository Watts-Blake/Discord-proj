
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

    channel_meesage_sent = relationship('ChannelMessage', backref='sender',cascade="all, delete")

    server_dm_rooms_owned = relationship('ServerDmRoom', backref='owner', cascade='all, delete')

    server_dm_member = relationship('ServerDmMember', backref='member',cascade="all, delete")

    server_dm_sent = relationship('ServerDm', backref='sender',cascade="all, delete")

    dm_rooms_owned = relationship('DmRoom', backref='owner', cascade='all, delete')

    dm_member = relationship('DmMember', backref='member',cascade="all, delete")

    dm_sent = relationship('Dm', backref='sender',cascade="all, delete")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
        'id': self.id,
        'username': self.username,
        'email':self.email,
        'profilePicture': self.profile_picture,
        'serverOwned': [{'id':server.id, 'name': server.name} for server in self.servers_owned],
        'serverMember': [{'id':server.server_id, 'name': server.server.name, 'membersLength': len(server.server.members)  }for server in self.server_member],
        'channelMessagesSent': [message.to_dict() for message in self.channel_messages_sent],
        'serverDmMember': [{'membershipId':member.id, 'roomId': member.dm_id, 'userId':member.user_id}for member in self.server_dm_member],
        'serverDmSent': [message.to_dict() for message in self.server_dm_sent],
        'dmMember': [{'membershipId':member.id, 'dmRoomId': member.dm_id, 'userId':member.user_id}for member in self.dm_member],
        'dmSent': [message.to_dict() for message in self.dm_sent]
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

    def in_dm_room(self, room_id):
        for dm_room in self.dm_member:
            if dm_room.dm_room_id == room_id:
                return True
        return False
