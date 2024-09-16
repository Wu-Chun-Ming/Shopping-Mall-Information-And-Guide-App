import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser
import os

DB = 'users_info.sqlite'

# For server response
def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'username': row[1],
        'password': row[2],
    }

    return row_dict

app = Flask(__name__)

# Fetch users
@app.route('/api/users', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users ORDER BY name')
    rows = cursor.fetchall()
    # print(rows)
    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = get_row_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

# Fetch user detail
@app.route('/api/users/<string:username>', methods=['GET'])
def show(username):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE username=?', (str(username),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = get_row_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

# Insert new user
@app.route('/api/user/', methods=['POST'])
def store():
    if not request.json:
        abort(404)

    new_user = (
        request.json['username'],
        request.json['password'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO users(username, password) VALUES(?,?)
    ''', new_user)

    user_id = cursor.lastrowid

    db.commit()

    response = {
        'id': user_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

# Update user password
@app.route('/api/user/<string:username>', methods=['PUT'])
def update(username):
    if not request.json:
        abort(400)

    if 'username' not in request.json:
        abort(400)

    # if int(request.json['id']) != place:
    #     abort(400)

    update_user = (
        request.json['new_password'],
        request.json['username'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE users SET password=?
        WHERE username=?
    ''', update_user)

    db.commit()

    response = {
        'id': username,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

# Delete user account
@app.route('/api/user/<string:username>', methods=['DELETE'])
def delete(username):
    if not request.json:
        abort(400)

    # if 'id' not in request.json:
    #     abort(400)
    if 'username' not in request.json:
        abort(400)

    # if int(request.json['id']) != place:
    #     abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM users WHERE username=?', (username,))

    db.commit()

    response = {
        'id': username,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
