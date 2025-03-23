from flask import Flask
from config import get_config
from app.models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())

    db.init_app(app)

    from app import routes
    routes.register_routes(app)

    return app