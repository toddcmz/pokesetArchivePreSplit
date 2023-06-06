from flask import render_template, flash, redirect, url_for
from . import bp
from app.forms import SignupForm, SigninForm
from app.models import User
from flask_login import login_user, current_user

@bp.route('/signin', methods=['GET', 'POST'])
def signin():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = SigninForm()
    if form.validate_on_submit():
        thisUser = User.query.filter_by(username=form.username.data).first()
        if thisUser and thisUser.check_password(form.password.data):
            flash(f'{form.username.data} signed in', 'success')
            login_user(thisUser)
            return redirect(url_for('main.home'))
        else:
            flash(f'{form.username.data} does not exist or incorrect password', 'warning')
    return render_template('signin.jinja', title='Sign In', form=form)

@bp.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = SignupForm()
    if form.validate_on_submit():
            username = form.username.data
            email = form.email.data
            # make sure you don't need token or datetime in here.
            checkUser = User.query.filter_by(username=username).first()
            checkEmail = User.query.filter_by(email=email).first()
            if not checkUser and not checkEmail:
                thisUser = User(username=username, email=email)
                thisUser.password = thisUser.hash_password(form.password.data)
                thisUser.add_token()
                thisUser.commit()
                flash(f"Username '{username}' submitted a sign up request", 'success')
                return redirect(url_for('main.home'))
            elif checkUser:
                flash(f'{username} already taken, try again', 'warning')
            else:
                flash(f'{email} already taken, try again', 'warning')
    return render_template('signup.jinja', title='Sign Up', form=form)