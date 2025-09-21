from flask import Flask
from src.db import init_db
from src.routes import routes
from src.socketio_instance import socketio

app = Flask(__name__)
socketio.init_app(app)

init_db(app)
app.register_blueprint(routes)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')