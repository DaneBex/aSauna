from crypt import methods
from wsgiref.util import request_uri
from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/<int:id>', methods=["PUT"])
def update_user(id):

    user = User.query.get(id)

    print('\n\n\n\n\n\n', request.json, '\n\n\n\n\n\n\n\n')

    if 'profile_pic' in request.json:
        user.profile_pic = request.json["profile_pic"]
    if 'username' in request.json:
        user.username = request.json["username"]
    if 'about_me' in request.json:
        user.about_me = request.json["about_me"]
    if request.json == 'maroon':
        user.background_color = 'maroon'
    if request.json == 'mustard':
        user.background_color = 'mustard'
    if request.json == 'lime':
        user.background_color = 'lime'
    if request.json == 'pine':
        user.background_color = 'pine'
    if request.json == 'ocean':
        user.background_color = 'ocean'
    if request.json == 'lightblue':
        user.background_color = 'lightblue'
    if request.json == 'blue':
        user.background_color = 'blue'
    if request.json == 'lightpurple':
        user.background_color = 'lightpurple'
    if request.json == 'purple':
        user.background_color = 'purple'
    if request.json == 'pink':
        user.background_color = 'pink'
    if request.json == 'grey':
        user.background_color = 'grey'
    if request.json == 'white':
        user.background_color = 'white'


    db.session.add(user)
    db.session.commit()
    return user.to_dict()
