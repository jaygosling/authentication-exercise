"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import JWTManager, create_access_token

api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/token', methods=['POST'])
def token():

    username = request.json.get("username", None)
    password = request.json.get("password", None)
    # Query your database for username and password
    user = User.query.filter_by(username=username, password=password).first()
    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

@api.route('/signup', methods=['POST'])
def signup():
    

    username = request.json.get("username", None)

    checkUser = User.query.filter_by(username=username).first()
    if (checkUser):
        return jsonify({"msg": "Username Already Exists"}), 401
    
    user = User()
    user.username = request.json.get("username", None)
    user.password = request.json.get("password", None)

    db.session.add(user)
    db.session.commit()

    # create a new token with the user id inside

    return jsonify({"msg":"Everything Went Well"}), 200
