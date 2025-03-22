from flask import Flask
from app.routes import register_routes
from config import get_config


def create_app():
    app = Flask(__name__)
    app.config.from_object(get_config())

    register_routes(app)

    return app