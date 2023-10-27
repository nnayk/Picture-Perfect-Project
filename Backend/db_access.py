from flask import Flask, jsonify, request
from mongoengine import connect, Document, StringField

app = Flask(__name__)

connect(db='dbPicturePerfect', host='localhost', port=27017)

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    name = StringField(required=True)

    meta = {'collection': 'users'}

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()

    user = User(
        username=data['username'],
        password=data['password'],  
        name=data['name']
    )
    user.save()

    return jsonify({"message": "User created successfully!", "user_id": str(user.id)}), 201

@app.route('/users')
def get_users():
    users = User.objects.all()
    print(users)
    return jsonify([{
        'username': user.username,
        'name': user.name,
        'id': str(user.id)
    } for user in users])

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)