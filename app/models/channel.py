
from sqlalchemy import Integer, ForeignKey, String, DateTime, Boolean
from sqlalchemy.sql import func, expression
from sqlalchemy.orm import relationship

from sqlalchemy.orm import Session
from .db import db

class Channel(db.Model):
    __tablename__ = 'channels'

    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(100), nullable=False)
    server_id = db.Column(Integer, ForeignKey('servers.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    messages = relationship('ChannelMessage', backref='channel',cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serverId': self.server_id,
            'messages': {message.id:message.to_dict() for message in self.messages},
        }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'serverId': self.server_id,
        }


class ChannelMessage(db.Model):
    __tablename__ = 'channelMessages'

    id = db.Column(Integer, primary_key=True)
    channel_id = db.Column(Integer, ForeignKey('channels.id'))
    sender_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    pinned = db.Column(Boolean, default=False)
    content = db.Column(String(2000), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'serverId': self.channel.server_id,
            'channelId': self.channel_id,
            'senderId': self.sender_id,
            'senderUsername':self.sender.username,
            'senderProfilePicture':self.sender.profile_picture,
            'content': self.content,
            'pinned': self.pinned,
            'createdAt': self.created_at,
             'updatedAt': self.updated_at
        }
