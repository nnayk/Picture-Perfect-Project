import requests
import sys

def generate_url(prompt):
    url = "https://imagegolf.io/api/generate"
    data = {
        "inputValue": prompt
    }

    r = requests.post(url, json=data)

    return (r.json()["output"])

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: script_name <input_value>")
        sys.exit(1)
    
    input_value = sys.argv[1]
    result = generate_url(input_value)
    print(result)
