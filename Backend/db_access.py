from flask import Flask, jsonify, request
from mongoengine import (
    connect,
    Document,
    StringField,
    IntField,
    ReferenceField,
    NotUniqueError,
)
import json

from werkzeug.security import check_password_hash
import secrets
from mongoengine.errors import DoesNotExist

app = Flask(__name__)

# MongoDB connection
connect(db="dbPicturePerfect", host="localhost", port=27017)


class User(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True)
    encrypted_password = StringField(
        required=True
    )  


    ranking = IntField()

    meta = {"collection": "users"}


class Image(Document):
    creator = ReferenceField(User, required=True)
    url = StringField(required=True)
    prompt = StringField(required=True)
    votes = IntField(default=0)

    meta = {"collection": "images"}


@app.route("/create_user", methods=["POST"])
def create_user():
    data = json.loads(request.data.decode("utf-8"))
    #print(f"data = {data}")
    user = User(
        username=data["username"],
        encrypted_password=data["password"],
        email=data["email"]
    )
    try:
        user.save()
        return (
            jsonify(
                {
                    "message": "User created successfully!",
                    "user_id": str(user.id),
                }
            ),
            201,
        )
    except NotUniqueError:
        return (
            jsonify({"error": "Username or email already exists. Choose another."}),
            400,
        )


@app.route("/create_image", methods=["POST"])
def create_image():
    data = request.get_json()

    # Retrieve the user by ObjectId
    creator = User.objects.get(id=data["creator"])

    # Associate the image with the user and save it
    image = Image(creator=creator, prompt=data["prompt"], url=data["url"])
    image.save()

    return (
        jsonify(
            {
                "message": "Image data added successfully!",
                "image_id": str(image.id),
            }
        ),
        201,
    )


@app.route("/users")
def get_users():
    users = User.objects.all()
    return jsonify(
        [
            {
                "username": user.username,
                "name": user.name,
                "user_id": str(user.id),
            }
            for user in users
        ]
    )


@app.route("/images")
def get_images():
    images = Image.objects.all()
    return jsonify(
        [
            {
                "creator_id": str(
                    image.creator.id
                ),  # updated from user to creator
                "prompt": image.prompt,
                "url": image.url,
                "votes": image.votes,
                "image_id": str(image.id),
            }
            for image in images
        ]
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
