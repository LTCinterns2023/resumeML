import random

from flask import Flask, request, send_file, Response
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse

# FLASK API
app = Flask(__name__)
CORS(app)
api = Api(app)

number = random.randint(1, 10)
print(number)


class Model(Resource):
    def get(self, guessNumber):
        global number
        if guessNumber != number:
            return {"testing": "Fail"}
        return {"testing": "Success"}


api.add_resource(Model, "/model/<int:guessNumber>")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3000)
