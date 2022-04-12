
from .db import db
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship


class DmRoom(db.Model):
    __tablename__ = 'dmRooms'

    id = db.Column(Integer, primary_key=True)
    owner_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    members = relationship('DmMember', backref='room',cascade="all, delete")
    messages = relationship('Dm', backref='room_messages',cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'members': {member.id: member.to_dict() for member in self.members},
            'messages': {message.id: message.to_dict() for message in self.messages}
    }
    def to_resource_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'members': {member.id: member.to_dict() for member in self.members},
    }

class DmMember(db.Model):
    __tablename__ = 'DmMembers'

    id = db.Column(Integer, primary_key=True)
    room_id = db.Column(Integer, ForeignKey('dmRooms.id'), nullable=False)
    user_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'roomId': self.room_id,
            'userId': self.user_id,
            'username':self.member.username,
            'profilePicture': self.member.profile_picture
    }

class Dm(db.Model):
    __tablename__ = 'dms'

    id = db.Column(Integer, primary_key=True)
    room_id = db.Column(Integer, ForeignKey('dmRooms.id'))
    sender_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    content = db.Column(String(2000), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'roomId': self.room_id,
            'senderId': self.sender_id,
            'senderUsername':self.sender.username,
            'senderProfilePicture':self.sender.profile_picture,
            'content': self.content,
            'createdAt': self.created_at,
             'updatedAt': self.updated_at
        }
