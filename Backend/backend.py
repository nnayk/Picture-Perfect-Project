from flask import Flask, request, jsonify
import requests
from flask_cors import CORS, cross_origin

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
    data = request.get_json()
    user = data["username_input"]
    password = data["password_input"]
    name = data["name_input"]

    user_data = {"username": user, "password": password, "name": name}
    response = requests.post(f"{DB_ACCESS_URL}/create_user", json=user_data)

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
