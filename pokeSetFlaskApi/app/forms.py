from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, IntegerField
from wtforms.validators import DataRequired, Email

class SignupForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), Email()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField('Sign Up')

class SigninForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = PasswordField('password', validators=[DataRequired()])
    submit = SubmitField('Sign In')

class GameScoreForm(FlaskForm):
    sets_found = IntegerField('sets_found', validators=[DataRequired()])
    submit = SubmitField('Send Score')