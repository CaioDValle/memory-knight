from flask import current_app
from .db import mysql

def insert_score(name, time):
    try:
        conn = mysql.connection
        cursor = conn.cursor()
        cursor.execute("INSERT INTO scores (name, time) VALUES (%s, %s)", (name, time))
        conn.commit()
        return True
    except Exception as e:
        current_app.logger.error(f"Erro ao inserir score: {e}")
        return False
    finally:
        cursor.close()