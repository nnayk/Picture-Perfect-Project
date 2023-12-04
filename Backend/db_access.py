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

# from dotenv import load_dotenv

# load_dotenv()

import os

app = Flask(__name__)

# MongoDB connection
mongo_uri = os.environ.get("MONGO_URI")
connect(host=mongo_uri)


class User(Document):
    username = StringField(required=True, unique=True)
    email = StringField(required=True)
    encrypted_password = StringField(required=True)
    ranking = IntField()

    meta = {"collection": "users"}


class Image(Document):
    creator = ReferenceField(User, required=True)
    url = StringField(required=True)
    prompt = StringField(required=True)
    votes = IntField(default=0)

    meta = {"collection": "images"}


@app.route("/create_test_user", methods=["POST"])
def create_test_user():
    user = User(
        username="bob",
        encrypted_password="pwd",
        email="bob@gmail.com",
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
            jsonify(
                {
                    "error": """Username or email already exists.
                                 Choose another."""
                }
            ),
            400,
        )


@app.route("/create_user", methods=["POST"])
def create_user():
    data = json.loads(request.data.decode("utf-8"))
    user = User(
        username=data["username"],
        encrypted_password=data["password"],
        email=data["email"],
    )
    try:
        user.save()
        print(f"successfully added user {user.username}")
        return (
            jsonify(
                {
                    "message": "User created successfully!",
                    "user_id": str(user.id),
                }
            ),
            201,
        )
    except:
        return (
            jsonify(
                {
                    "message": "Internal server error",
                }
            ),
            500,
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


@app.route("/users", methods=["GET"])
def get_users():
    data = json.loads(request.data.decode("utf-8"))
    user = User.objects(username=data["username"]).first()
    print(f"user={user}")
    if user:
        return (
            jsonify(
                {
                    "error": """Username already exists.
                                 Choose another."""
                }
            ),
            401,
        )
    user = User.objects(email=data["email"]).first()
    print(f"user={user}")
    if user:
        return (
            jsonify(
                {
                    "error": """Email already exists.
                                 Choose another."""
                }
            ),
            401,
        )
    if user is None:
        return (
            jsonify({"error": """User credentials are unique"""}),
            200,
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
