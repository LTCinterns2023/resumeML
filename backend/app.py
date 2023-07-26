import os
import random
import sys
import sqlite3 as sql

from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Api, Resource
from model import Model


# FLASK API
app = Flask(__name__)
CORS(app)
api = Api(app)
conn = sqlite3.connect("./applicants.db")
cursor = conn.cursor()
cursor.execute("PRAGMA foreign_keys = ON")

@app.route("/")
def testHomePage():
    return {"message": "API working"}

def convert_to_blob(filename):
    with open(filename, "rb") as file:
        blobData = file.read()
    return blobData

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

class Resume(Resource):
    def get(self, path):
        cursor.execute("""
            SELECT            
        """)

    def post(self, path):
        pass

api.add_resource(RankModel, "/model/<string:path>/<string:job>")
api.add_resource(Resume, "/resume/<string:path>")

app.run(host="0.0.0.0", port=49152)
