from flask import Flask, request
from flask_cors import CORS
from flask_restful import Api, Resource, reqparse, fields, marshal_with
from werkzeug.local import Local

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer

import sqlite3 as sql
import PyPDF2
from model import Model
import re
import pickle

# FLASK API SETUP
app = Flask(__name__)
CORS(app)
api = Api(app)

# SQL-LITE SETUP
conn = sql.connect("./backend/database.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("PRAGMA foreign_keys = ON")
cursor.execute("""
    CREATE TABLE IF NOT EXISTS candidates (
        applicantID INTEGER PRIMARY KEY AUTOINCREMENT,

        applicantName TEXT,
        applicantEmail TEXT,
        applicantNumber TEXT,

        isLiked INTEGER NOT NULL,
        applicantNotes TEXT NOT NULL,

        resumeText TEXT NOT NULL,
        resumeSummary TEXT NOT NULL,
        filePDF BLOB
    );
""")
conn.commit()

# Defining the API's response body
resourceField = {
    "applicantName": fields.String,
    "applicantEmail": fields.String,
    "applicantNumber": fields.String,

    "isLiked": fields.Boolean,
    "notes": fields.String,

    "resumeSummary": fields.String,
    "filePDF": fields.Raw,

    "rank": fields.Nested({"Data Science": fields.Float,
                           "HR": fields.Float,
                           "Advocate": fields.Float,
                           "Arts": fields.Float,
                           "Web Designing": fields.Float,
                           "Mechanical Engineer": fields.Float,
                           "Sales": fields.Float,
                           "Health and fitness": fields.Float,
                           "Civil Engineer": fields.Float,
                           "Java Developer": fields.Float,
                           "Business Analyst": fields.Float,
                           "SAP Developer": fields.Float,
                           "Automation Testing": fields.Float,
                           "Electrical Engineering": fields.Float,
                           "Operations Manager": fields.Float,
                           "Python Developer": fields.Float,
                           "DevOps Engineer": fields.Float,
                           "Network Security Engineer": fields.Float,
                           "PMO": fields.Float,
                           "Database": fields.Float,
                           "Hadoop": fields.Float,
                           "ETL Developer": fields.Float,
                           "DotNet Developer": fields.Float,
                           "Blockchain": fields.Float,
                           "Testing": fields.Float
                           })
}

# Params for API Requests
search_get_args = reqparse.RequestParser()
search_get_args.add_argument("searchTerm", type=str, required=True, action="append")

notes_update_args = reqparse.RequestParser()
notes_update_args.add_argument("newText", type=str, help="New Text Needed", required=True)

resume_get_args = reqparse.RequestParser()
resume_get_args.add_argument("id", type=str, help="ID needed", required=True)
resume_get_args.add_argument("job", type=str, help="Job needed", required=True)

# Helper Function for Latin-1 Codec
def elimNonLatin(text):
    cleaned_text = ""
    for char in text:
        if ord(char) <= 255:  
            cleaned_text += char
    return cleaned_text

# API Resources
class Search(Resource):
    def get(self):
        searchTerms = search_get_args.parse_args()
        return 404

class Notes(Resource):
    def get(self, applicantID):
        conn.execute(f"""
            SELECT applicantNotes FROM candidates
            WHERE applicantID = {applicantID}
        """)
        row = cursor.fetchone()

        if len(row) <= 0:
            return 400
        return 200, {"applicantNotes": row[0]}

    def patch(self, applicantID):
        newText = notes_update_args.parse_args()["newText"]
        try:
            conn.execute(f"""
                UPDATE candidates
                SET applicantNotes = {newText}
                WHERE applicantID = {applicantID}
            """)
            conn.commit()
            return 200
        except:
            return 400


class Like(Resource):
    def get(self, applicantID):
        conn.execute(f"""
                   SELECT isLiked FROM candidates
                   WHERE applicantID = {applicantID}
               """)
        row = cursor.fetchone()

        if len(row) <= 0:
            return 400

        if row[0] % 0:
            return 200, {"isLiked": False}
        else:
            return 200, {"isLiked": True}

    def patch(self, applicantID):
        try:
            conn.execute(f"""
                UPDATE candidates
                SET isLiked = applicantNotes + 1
                WHERE applicantID = {applicantID}
            """)
            conn.commit()
            return 200
        except:
            return 400


class Resume(Resource):
    @marshal_with(resourceField)
    def get(self):
        args = resume_get_args.parse_args()
        cursor.execute(f"""
            SELECT * FROM candidates
            WHERE applicantID = {args["id"]}       
        """)
        result = cursor.fetchone()
        resumeText = result[6]

        if not resumeText:
            return 404

        try:
            model = Model(args["id"], resumeText)
            model.initializeResumes()
            preds = model.getPredictions()
            return 200, {
                "applicantName": result[0],
                "applicantEmail": result[1],
                "applicantNumber": result[2],

                "isLiked": result[3],
                "notes": result[4],

                "resumeSummary": result[5],
                "filePDF": result[6],

                "rank": preds[args["id"]]
            }
        except:
            return 500

    def post(self):
        try:
            uploaded_file = request.files['pdf']
            if uploaded_file.filename[-4:] != ".pdf":
                return 415, {"response": "Not A PDF File"}
        except KeyError:
            return 400, {"response": "No File in the HTTP Body"}

        pdfObject = PyPDF2.PdfReader(uploaded_file)
        textResume = ""

        # Extract text from each page
        for page_num in range(len(pdfObject.pages)):
            page = pdfObject.pages[page_num]
            textResume += page.extract_text()
        textResume = elimNonLatin(textResume)

        # Scraping Data
        splitResume = textResume.split()

        # Name
        applicantName = " ".join(splitResume[:2]).lower().title()

        # Email
        try:
            applicantEmail = splitResume[list(map(lambda word: True if "@" in word else False, splitResume)).index(True)]
        except ValueError:
            applicantEmail = "Not Found Automatically"

        # Phone Number
        applicantNumber = "Not Found Automatically"
        patterns = [
            r'\+\d\s\d{3}\s\d{3}\s\d{4}',
            r'\(\d{3}\)\s\d{3}\s\d{4}',
            r'\d{10}',
            r'\+\d\d{10}',
            r'\(\d{3}\)-\d{3}-\d{4}',
            r'\(\d{3}\)\s\d{3}-\d{4}',
            r'\d{3}\s\d{3}\s\d{4}'
            r'\d{3}-\d{3}-\d{4}',
            r'\d{3}[-\s]?\d{3}[-\s]?\d{4}'
            r'\(\d{3}\)\s-\d{3}-\d{4}'
        ]
        for pattern in patterns:
            matches = re.findall(pattern, textResume)
            if len(matches) != 0:
                applicantNumber = matches[0]
                break

        # Resume Summarizer
        parser = PlaintextParser.from_string(textResume, Tokenizer("english"))
        summarizer = LexRankSummarizer()
        resumeSummary = summarizer(parser.document, sentences_count=7)

        # PDF -> PICKLED BLOB
        filePDF = pickle.dumps(pdfObject)

        # Saving to Database
        conn.execute("""
            INSERT INTO candidates (
                applicantName,
                applicantEmail,
                applicantNumber,
                isLiked,
                applicantNotes,
                resumeText,
                resumeSummary,
                filePDF
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        """, (
            applicantName,
            applicantEmail,
            applicantNumber,
            0,
            "",
            textResume,
            str(resumeSummary[0]),
            filePDF,
        ))
        conn.commit()

        print(textResume)
        return {
            "applicantName": elimNonLatin(applicantName),
            "applicantEmail": elimNonLatin(applicantEmail),
            "applicantNumber": elimNonLatin(applicantNumber),
            "resumeSummary": elimNonLatin(str(resumeSummary[0])),
            "resumeText": elimNonLatin(str(textResume))
        }, 200

class Test(Resource):
    def post(self):
        return {"hi":"h"}

api.add_resource(Notes, "/note/<int:applicantID>")
api.add_resource(Like, "/like/<int:applicantID>")
api.add_resource(Resume, "/resume/")
api.add_resource(Test, "/test/")

app.run(host="0.0.0.0", port=49152)
