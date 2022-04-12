from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Integer, ForeignKey, String, DateTime
from sqlalchemy.sql import func, table, column
from sqlalchemy.orm import relationship, Session
from alembic import op
from sqlalchemy.orm import Session
from .db import db

class VoiceChannel(db.Model):
    __tablename__ = 'voiceChannels'

    id = db.Column(Integer, primary_key=True)
    name = db.Column(String(100), nullable=False)
    owner_id = db.Column(Integer, ForeignKey('users.id'), nullable=False)
    server_id = db.Column(Integer, ForeignKey('servers.id'), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'ownerId': self.owner_id,
            'serverId': self.server_id,
        }
