from flask import render_template, url_for, flash, redirect
from . import bp
from flask_login import login_required, current_user
from app.forms import GameScoreForm
from app.models import User, Scores_Table

@bp.route('/', methods=['GET', 'POST'])
def home():
    return render_template('index.jinja', title='pokesetBackend')

@bp.route('/addscore', methods=['GET', 'POST'])
@login_required
def addscore():
    logThisGame = GameScoreForm()
    if logThisGame.validate_on_submit():
        # get this user id
        thisUser = User.query.filter_by(username=current_user.username).first()
        thisUsername = thisUser.username
        thisUserId = thisUser.user_id
        thisScore = logThisGame.game_score.data
        # assign all values to teams table
        thisNewScoreEntry = Scores_Table(user_id=thisUserId, 
                                        username=thisUsername,
                                        game_score=thisScore)
        thisNewScoreEntry.commit()
        flash(f"New score {thisScore} added to {current_user.username}'s score table.", 'success')
        return redirect(url_for('main.home'))

    return render_template('addscore.jinja', title="test add score", form=logThisGame)