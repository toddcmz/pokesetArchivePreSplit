from flask import request, jsonify
from . import bp
from app.models import User, Scores_Table
from app.blueprints.api.helpers import token_required

# verify a user
@bp.post('/verifyuser')
def api_verify_user():
    content = request.json
    thisUsername = content['username']
    thisPassword = content['password']
    thisUser = User.query.filter_by(username=thisUsername).first()
    if thisUser and thisUser.check_password(thisPassword):
        return jsonify([{'user token': thisUser.token}])
    return jsonify([{'message':'Invalid credentials supplied'}]), 404

# register a user
@bp.post('/newuser')
def api_new_user():
    content = request.json
    thisUsername = content['username'] # written like this assuming we're keying into a passed in json obj
    thisEmail = content['email'] # again, this is all predicated on user posting a json file here.
    thisPassword = content['password']
    thisUserCheck = User.query.filter_by(username=thisUsername).first()
    if thisUserCheck:
        return jsonify([{'message':'Username taken, try again.'}])
    thisEmailCheck = User.query.filter_by(email=thisEmail).first()
    if thisEmailCheck:
        return jsonify([{'message':'Email taken, try again.'}])
    thisNewUser = User(email = thisEmail, username=thisUsername)
    thisNewUser.password = thisNewUser.hash_password(thisPassword)
    thisNewUser.add_token()
    thisNewUser.commit()
    return jsonify([{'message': f"{thisNewUser.username} registered"}])

# receive all game scores
@bp.get('/scores')
@token_required
def api_scores():
    result = []
    # add to this list all games in database
    theseGames = Scores_Table.query.all() # .all() is returning all posts, where is post is a class
    for eachGame in theseGames:
        result.append({'game_id': eachGame.game_id,
                       'sets_found':eachGame.sets_found,
                       'game_date': eachGame.game_date,
                       'user_id': eachGame.user_id,
                       'username': eachGame.username})
    return jsonify(result), 200 # this 200 is returning a "success" status

# receive all scores from a single user
@bp.get('/scores/<username>')
@token_required
def user_scores(thisUser, username):
    thisUser = User.query.filter_by(username=username).first().user_id
    if thisUser: # if they give us a username we query for it, if there's no match then the username give was invalid
        theseGames = Scores_Table.query.filter_by(user_id=thisUser)
        result=[]
        for eachGame in theseGames:
            result.append({'game_id': eachGame.game_id,
                        'sets_found':eachGame.sets_found,
                        'game_date': eachGame.game_date,
                        'user_id': eachGame.user_id,
                        'username': eachGame.username})
        return jsonify(result), 200 # this 200 is returning a "success" status
    return jsonify([{'message':"user was not found"}]), 401

# Log a new completed game score
@bp.post('/newScore')
@token_required
def log_newScore(thisUser):
    try:
        #receive the post data for logging a new game
        thisContent = request.json
        thisUserId = thisContent.get('user_id')
        thisUsername = thisContent.get('username')
        thisSetsFound = thisContent.get('sets_found')
        thisNewGame = Scores_Table(user_id = thisUserId,
                                   username = thisUsername,
                                   sets_found = thisSetsFound)
        # commit post
        thisNewGame.commit()
        # return message
        return jsonify([{'message':'Game Score Added'}]), 200
    except:
        return jsonify([{'message': 'invalid form data for new post'}]), 401