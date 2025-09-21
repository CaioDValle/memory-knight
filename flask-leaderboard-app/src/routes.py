from flask import Blueprint, render_template, request, redirect, url_for
from .models import insert_score
from .db import mysql
from flask_socketio import emit
from src.socketio_instance import socketio

routes = Blueprint('routes', __name__)

@routes.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        player_name = request.form['player']
        socketio.emit('start_game', {'player': player_name})
        return redirect('/game')
    return render_template('login.html')

@routes.route('/game')
def game():
    return render_template('game.html')

@routes.route('/leaderboard')
def leaderboard():
    conn = mysql.connection
    cursor = conn.cursor()
    cursor.execute("SELECT name, time FROM scores ORDER BY time ASC")
    players = cursor.fetchall()
    cursor.close()
    return render_template('leaderboard.html', players=players)

@routes.route('/submit_score', methods=['POST'])
def submit_score():
    player_name = request.form['name']
    game_time = request.form['game_time']
    success = insert_score(player_name, game_time)
    if success:
        return '', 204
    else:
        return 'Erro ao salvar score', 500
    
@socketio.on('my_event')
def handle_my_event(json):
    print('received json: ' + str(json))
    emit('my_response', {'data': 'Message received!'})

@socketio.on('play_game')
def handle_play_game(data):
    socketio.emit('start_game', {'player': data['player']})