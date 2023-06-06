from flask import request, jsonify
from app.models import User
from functools import wraps

def token_required(flask_route):
    @wraps(flask_route)
    def wrapper(*args,**kwargs):
        if 'x-access-token' in request.headers: # this is a membershp check on a dictionary
            # this comes in as 'bearer <token>' - a string
            try:
                thisToken = request.headers['x-access-token'].split()[-1] # this grabs the last element in our split out list
                thisUser = User.query.filter_by(token=thisToken).first()
                if thisUser:
                    return flask_route(thisUser, *args, **kwargs)
                return jsonify([{'message','Invalid token'}]), 401
            except:
                return jsonify([{'message','Invalid token'}]), 401
        return jsonify([{'message':'Missing token'}]), 401
    return wrapper