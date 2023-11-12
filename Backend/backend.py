import json
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS, cross_origin

from mongoengine import connect, Document, StringField, DoesNotExist
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import secrets  # For generating a session key

from db_access import User

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

DB_ACCESS_URL = (
    "http://127.0.0.1:5001"  # This is where db_access.py is running.
)


@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    text = data["text"]
    # In the future, create obj that stores:
    #   - Timestamp
    #   - Prompt
    #   - Image URL (placeholder till we send prompt to Dalle)
    #   - Author
    #   - Votes
    # For now, we'll just print it.
    print(text)
    return jsonify({"message": "Text logged successfully!"})


@app.route("/register", methods=["POST"])
def register():
    print("received register request")
    print(request, request.data)
    return jsonify({"message": "Registered successfully!"})


@app.route("/create_user", methods=["POST"])
def create_user():
    # print("BACKEND")
    data = json.loads(request.data.decode("utf-8"))
    username = data["username"]
    plain_text_password = data["password"]
    name = data["email"]

    # Hash the password
    hashed_password = generate_password_hash(
        plain_text_password, method="sha256"
    )

    # Prepare the user data with the hashed password
    user_data = {
        "username": username,
        "password": hashed_password,
        "name": name,
    }
    # Send the user data with the hashed password to the database access layer
    response = requests.post(f"{DB_ACCESS_URL}/create_user", json=user_data)

    # Handle the response from the database access layer
    if response.status_code == 201:
        print("User created successfully!")
        return jsonify({"message": "User logged successfully!"})
    elif response.status_code == 400:
        print("Duplicate username, please choose another")
        return jsonify(
            {"message": "Duplicate username, please choose another!"}
        )
    else:
        print("Failed to create user!")
        return jsonify({"message": "Failed to create user!!"})


if __name__ == "__main__":
    try:
        app.run(port=5000, debug=True)
    except OSError as e:
        print(f"Error: {e}. Is port 5000 already in use?")
