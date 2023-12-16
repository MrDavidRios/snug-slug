from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.sqlite import JSON

db = SQLAlchemy()

class Listing(db.Model):
    __tablename__ = 'listings'
    
    id = db.Column(db.Integer, primary_key=True)
    location = db.Column(db.String(200), nullable=False)
    overview = db.Column(db.String(500))
    details = db.Column(JSON)
    tags = db.Column(JSON)
    requirements = db.Column(JSON)
    additionalInfo = db.Column(JSON, name='additional_info')
    startDate = db.Column(db.Date, name='start_date')
    endDate = db.Column(db.Date, name='end_date')
    rent = db.Column(db.Integer)
    apartmentImgUrls = db.Column(JSON, name='apartment_img_urls')

    def __repr__(self):
        return f'<Listing {self.id}>'

user_archived_users = db.Table('user_archived_users',
    db.Column('archiver_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('archived_user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

user_saved_listings = db.Table('user_saved_listings',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('listing_id', db.Integer, db.ForeignKey('listings.id'), primary_key=True)
)

user_archived_listings = db.Table('user_archived_listings',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('archived_listing_id', db.Integer, db.ForeignKey('listings.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    age = db.Column(db.Integer)
    school = db.Column(db.String(100))
    class_year = db.Column(db.Integer, name='classYear')
    pronouns = db.Column(db.String(50))
    profile_pic_url = db.Column(db.String(255), name='profilePicUrl')
    bio = db.Column(db.Text)
    budget = db.Column(db.String(100))
    dates = db.Column(db.String(100))

    # Relationships
    active_listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'))
    active_listing = db.relationship('Listing', backref='owner', lazy=True, foreign_keys=[active_listing_id])

    saved_listings = db.relationship('Listing', secondary='user_saved_listings', backref='saved_by_users', lazy='dynamic')
    archived_users = db.relationship('User', secondary='user_archived_users', primaryjoin=(user_archived_users.c.archiver_id == id), secondaryjoin=(user_archived_users.c.archived_user_id == id), backref='archived_by_users', lazy='dynamic')
    archived_listings = db.relationship('Listing', secondary='user_archived_listings', backref='archived_by_user', lazy='dynamic')
    sent_messages = db.relationship('ChatMessage', backref='sender', lazy='dynamic', foreign_keys='ChatMessage.sender_id')
    received_messages = db.relationship('ChatMessage', backref='recipient', lazy='dynamic', foreign_keys='ChatMessage.recipient_id')

class ChatMessage(db.Model):
    __tablename__ = 'chat_messages'

    id = db.Column(db.Integer, primary_key=True)

    sender_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)

    text = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)