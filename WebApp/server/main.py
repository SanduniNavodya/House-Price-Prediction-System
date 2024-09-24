from flask import Flask, jsonify # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({
        'users': ['user1', 'user2', 'user3']
        })


if __name__ == '__main__':
    app.run(debug=True, port=8080)