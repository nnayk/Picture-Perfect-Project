from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    text = data['text']
    # In the future, create obj that stores:
    #   - Timestamp
    #   - Prompt
    #   - Image URL (placeholder till we send prompt to Dalle)
    #   - Author
    #   - Votes   
    # For now, we'll just print it.
    print(text)
    return jsonify({'message': 'Text logged successfully!'})

if __name__ == '__main__':
    app.run(debug=True)
