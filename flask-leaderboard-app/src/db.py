from flask_mysqldb import MySQL
from .config import MYSQL_CONFIG

mysql = MySQL()

def init_db(app):
    app.config['MYSQL_HOST'] = MYSQL_CONFIG['host']
    app.config['MYSQL_USER'] = MYSQL_CONFIG['user']
    app.config['MYSQL_PASSWORD'] = MYSQL_CONFIG['password']
    app.config['MYSQL_DB'] = MYSQL_CONFIG['db']
    mysql.init_app(app)
