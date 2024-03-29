from flask import Blueprint, jsonify, session, request
from app.models import User, db, Channel, ChannelMessage, ChannelMember
from app.forms import LoginForm
from flask_login import current_user, login_user, logout_user, login_required
from app.aws import upload_file_to_s3, allowed_file, get_unique_filename

auth_routes = Blueprint("auth", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": ["Unauthorized"]}


@auth_routes.route("/login", methods=["POST"])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data["email"]).first()
        login_user(user)

        return user.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    """

    errors = []
    email = User.query.filter(User.email == request.form["email"]).first()
    username = User.query.filter(User.username == request.form["username"]).first()
    password = request.form["password"]
    repeat_password = request.form["repeat_password"]

    url = "https://www.svgrepo.com/show/331368/discord-v2.svg"
    if email:
        errors.append("Email address is already in use.")
    if username:
        errors.append("Username is already in use.")
    if password != repeat_password:
        errors.append("Passwords do not match.")
    if "image" in request.files:
        image = request.files["image"]
        if not allowed_file(image.filename):
            errors.append("file type not permitted.")
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        url = upload["url"]
    if len(errors):
        return {"errors": errors}, 401

    user = User(
        username=request.form["username"],
        email=request.form["email"],
        profile_picture=url,
        password=request.form["password"],
    )
    db.session.add(user)
    db.session.commit()

    new_channel = Channel(owner_id=2, dm_channel=True)
    db.session.add(new_channel)
    db.session.commit()

    new_channel_member_me = ChannelMember(channel_id=new_channel.id, user_id=2)
    db.session.add(new_channel_member_me)
    new_channel_member = ChannelMember(channel_id=new_channel.id, user_id=user.id)
    db.session.add(new_channel_member)

    db.session.commit()

    new_message = ChannelMessage(
        channel_id=new_channel.id,
        sender_id=2,
        content="Hello, Thank you for visiting Diss-cord, an on going discord clone project, if you have any questions, feel free to message me here. If you'd like to know more about the project or myself feel free to click the github, or linked icons within the left navbar.",
    )
    db.session.add(new_message)
    db.session.commit()

    login_user(user)
    return user.to_dict()


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": ["Unauthorized"]}, 401
