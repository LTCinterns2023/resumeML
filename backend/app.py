import os
import random
import sys

from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api, Resource
from model import Model

# FLASK API
app = Flask(__name__)
CORS(app)
api = Api(app)

number = random.randint(1, 10)
print(number)

@app.route("/")
def testHomePage():
    return {"message": "API working"}

class RankModel(Resource):
    def get(self, path, job):
        if not os.path.exists(path):
            return 404, {"response": "Path Specified Does Not Exist"}

        # Getting Model Data
        model = Model()
        model.initializeResumes()
        predictions = model.getPredictions()
        model.getGraphs(predictions, show=True, save=True)
        return model.rank(predictions, job)


api.add_resource(RankModel, "/model/<string:path>/<string:job>")
app.run(host="0.0.0.0", port=49152)
