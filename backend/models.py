from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(120), nullable=False)
    role = db.Column(db.String(50), default="admin")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "role": self.role,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

class Lead(db.Model):
    __tablename__ = "leads"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    reason_for_connecting = db.Column(db.String(150), nullable=False)
    source = db.Column(db.String(50), default="Contact Form")  # 'Contact Form' | 'Chatbot' | 'WhatsApp'
    status = db.Column(db.String(50), default="New")  # 'New', 'In Review', 'Contacted', 'Qualified', 'Closed'
    notes = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "reason_for_connecting": self.reason_for_connecting,
            "source": self.source,
            "status": self.status,
            "notes": self.notes,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }

class ChatLog(db.Model):
    __tablename__ = "chat_logs"

    id = db.Column(db.Integer, primary_key=True)
    session_id = db.Column(db.String(100), nullable=False, index=True)
    sender = db.Column(db.String(20), nullable=False)  # 'user' | 'bot'
    message = db.Column(db.Text, nullable=False)
    matched_topic = db.Column(db.String(150), nullable=True)
    escalated = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "session_id": self.session_id,
            "sender": self.sender,
            "message": self.message,
            "matched_topic": self.matched_topic,
            "escalated": self.escalated,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
