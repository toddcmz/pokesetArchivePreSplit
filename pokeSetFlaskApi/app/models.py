from app import db, login
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from secrets import token_urlsafe
from datetime import datetime

@login.user_loader
def load_user(user_id):
    return User.query.get(user_id)

class User(UserMixin, db.Model):
    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    email = db.Column(db.String, unique=True)
    token = db.Column(db.String)
    password = db.Column(db.String)
    game_scores = db.relationship('Scores_Table', backref='user', lazy=True)

    def __repr__(self):
        return f'User {self.username}'
    
    def commit(self):
        db.session.add(self)
        db.session.commit()

    def hash_password(self, password):
        return generate_password_hash(password)
    
    def check_password(self, password_input):
        return check_password_hash(self.password, password_input)
    
    def add_token(self):
        setattr(self,'token', token_urlsafe(32) )
    
    def get_id(self): # this gets called automatically by flask_login when needed
        return str(self.user_id)
    
class Scores_Table(db.Model):
    game_id = db.Column(db.Integer, primary_key=True)
    game_score = db.Column(db.Float)
    game_date = db.Column(db.DateTime, default = datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'))
    username = db.Column(db.String)

    def __repr__(self):
        return f'Game ID {self.game_id}'
    
    def commit(self):
        db.session.add(self)
        db.session.commit()