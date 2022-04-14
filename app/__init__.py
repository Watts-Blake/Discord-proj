import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.servers import servers_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(servers_routes, url_prefix='/api/servers')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    if path[0:4] == 'svgs':
        return app.send_static_file(path[5:])
    # if path == '/svgs/edit-server-img.svg':
    #     return app.send_static_file('edit-server-img.svg')
    # if path == '/svgs/pound.svg':
    #     return app.send_static_file('pound.svg')
    # if path == '/svgs/addMemb.svg':
    #     return app.send_static_file('addMemb.svg')
    # if path == '/svgs/settings.svg':
    #     return app.send_static_file('settings.svg')
    # if path == '/svgs/svgexport-14.svg':
    #     return app.send_static_file('svgexport-14.svg')
    # if path == '/svgs/svgexport-94.svg':
    #     return app.send_static_file('svgexport-94.svg')
    # if path == '/svgs/gray-disc-home.svg':
    #     return app.send_static_file('gray-disc-home.svg')
    # if path == '/svgs/svgexport-16.svg':
    #     return app.send_static_file('svgexport-16.svg')
    # if path == '/svgs/svgexport-67.svg':
    #     return app.send_static_file('svgexport-67.svg')
    # if path == '/svgs/downCarrotSharp.svg':
    #     return app.send_static_file('downCarrotSharp.svg')
    # if path == '/svgs/XX.svg"':
    #     return app.send_static_file('XX.svg')
    # if path == '/svgs/leaveServer.svg':
    #     return app.send_static_file('leaveServer.svg')
    return app.send_static_file('index.html')
