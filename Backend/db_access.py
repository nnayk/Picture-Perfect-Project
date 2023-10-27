from flask import Flask, jsonify, request
from mongoengine import connect, Document, StringField

app = Flask(__name__)

# MongoDB connection
connect(db='dbPicturePerfect', host='localhost', port=27017)

class User(Document):
    username = StringField(required=True, unique=True)
    password = StringField(required=True)
    name = StringField(required=True)

    meta = {'collection': 'users'}  # Explicitly setting the collection name to 'users'

class Image(Document): 
    prompt = StringField(required=True)
    url = StringField(required=True)

    meta = {'collection': 'images'}  # Explicitly setting the collection name to 'images'





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

@app.route('/create_image', methods=['POST'])  
def create_image():
    data = request.get_json()

    image = Image(
        prompt=data['prompt'],
        url=data['url']
    )
    image.save()

    return jsonify({"message": "Image data added successfully!", "image_id": str(image.id)}), 201



@app.route('/users')
def get_users():
    users = User.objects.all()
    return jsonify([{
        'username': user.username,
        'name': user.name,
        'user_id': str(user.id) 
    } for user in users])


@app.route('/images')
def get_images():
    images = Image.objects.all()
    return jsonify([{
        'prompt': image.prompt,
        'url': image.url,
        'image_id': str(image.id)  
    } for image in images])




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001, debug=True)
