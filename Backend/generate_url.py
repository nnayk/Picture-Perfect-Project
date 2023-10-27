import requests


def generate_url(prompt):
    url = "https://imagegolf.io/api/generate"
    data = {
        "inputValue": prompt
    }

    r = requests.post(url, json=data)

    return r.text


print(generate_url("hi"))
