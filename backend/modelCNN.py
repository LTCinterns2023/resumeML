import os
import re

import gensim.downloader as api
import keras.models
import nltk
import seaborn as sns
import numpy as np
import pandas as pd
from gensim.models import KeyedVectors
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from matplotlib import pyplot as plt

INT_TO_CATG = {
    6: 'Data Science',
    12: 'HR',
    0: 'Advocate',
    1: 'Arts',
    24: 'Web Designing',
    16: 'Mechanical Engineer',
    22: 'Sales',
    14: 'Health and fitness',
    5: 'Civil Engineer',
    15: 'Java Developer',
    4: 'Business Analyst',
    21: 'SAP Developer',
    2: 'Automation Testing',
    11: 'Electrical Engineering',
    18: 'Operations Manager',
    20: 'Python Developer',
    8: 'DevOps Engineer',
    17: 'Network Security Engineer',
    19: 'PMO',
    7: 'Database',
    13: 'Hadoop',
    10: 'ETL Developer',
    9: 'DotNet Developer',
    3: 'Blockchain',
    23: 'Testing'
}
CATG_TO_GROUP = {
    "others": ["Advocate", "Arts", "Health and fitness"],
    "business": ["Business Analyst", "HR", "PMO", "Sales", "Operations Manager"],
    "developers": ["DotNet Developer", "ETL Developer", "Java Developer", "Python Developer", "SAP Developer",
                   "Web Designing"],
    "engineer": ["Civil Engineer", "Electrical Engineering", "Mechanical Engineer"],
    "backend": ["Blockchain", "Hadoop", "Database", "Data Science", "DevOps Engineer", "Network Security Engineer"],
    "QA": ["Automation Testing", "Testing"]
}


class Model:
    def __init__(self, applicantID, resumeText, modelPath="./backend/modelCNN.h5"):
        try:
            self.model = keras.models.load_model(modelPath)
        except FileNotFoundError:
            print("Error No Model Found")

        self.title = title
        self.resumeText = resumeText
        self.df = pd.DataFrame({
            "title": [title],
            "resume": [resumeText]
        })

    def _preprocessResume(self):
        # Clean Resumes
        def cleanData(uncleanedText):
            uncleanedText = re.sub(r"\b(\d{3})[-.]?(\d{3})[-.]?(\d{4})\b", "", uncleanedText)  # Removes Phone Number
            uncleanedText = re.sub(r"\b(\d{10})\b", "", uncleanedText)  # Removes Phone Number P2
            uncleanedText = re.sub(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b", "",
                                   uncleanedText)  # Removes Email
            uncleanedText = re.sub("http[s]?\://\S+", "", uncleanedText)  # Removes Links
            uncleanedText = re.sub(r"(\r)|(\n)", " ", uncleanedText)  # Removes Escape Characters \r and \n
            uncleanedText = re.sub(r"(\t)", "", uncleanedText)  # Removes Escape Characters \t
            uncleanedText = re.sub("&", "and", uncleanedText)  # Replaces & With and
            uncleanedText = re.sub("\s+", " ", uncleanedText)  # Remove Extra Whitespace
            uncleanedText = re.sub(r"[^\x00-\x7f]", r" ", uncleanedText)  # Removes Non-Ascii Characters
            uncleanedText = re.sub('[%s]' % re.escape("""!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"""), "",
                                   uncleanedText)  # remove punctuations
            return uncleanedText.lower()  # Lowercase everything

        self.df["resume"] = self.df.resume.apply(cleanData)

        # Downloading Required Packages
        nltk.download("punkt")
        nltk.download("stopwords")
        nltk.download('wordnet')
        nltk.download('omw-1.4')

        # Lemmatization
        def lemmatizerFunction(row):
            returnString = ""
            for word in str(row).split():
                returnString += " " + lemmatizer.lemmatize(word)
            return returnString

        lemmatizer = WordNetLemmatizer()
        self.df["resume"] = self.df["resume"].apply(lemmatizerFunction)

        # Tokenize Words
        def tokenizeFunction(row):
            return word_tokenize(row)

        self.df["resume"] = self.df["resume"].apply(tokenizeFunction)

        # Removing Stop Words
        def removeStopWords(row):
            return np.array([word for word in row if word.casefold() not in stop_words])

        stop_words = set(stopwords.words("english"))
        self.df["resume"] = self.df["resume"].apply(removeStopWords)

        # Cutting off Resumes to Only 1440 Words
        self.df["resume"] = self.df["resume"].apply(lambda row: row[0:1439])

    def _vectorize(self):
        # Loading Model From Local Directory
        try:
            model = KeyedVectors.load('wordEmbeding.d2v')
            print("downloaded version load")
        except FileNotFoundError:
            print("downloading version load")
            model = api.load("fasttext-wiki-news-subwords-300")
            model.save("wordEmbeding.d2v")

        # Apply Vectorization on self.df
        def vectorizedResume(row):
            returnArray = np.array([])
            numberOfError = 0

            for i, token in enumerate(row):
                try:
                    returnArray = np.append(returnArray, np.array(model[token])).reshape(i + 1 - numberOfError, 300)
                except KeyError:
                    if token != "monthscompany":  # months company is one of the largest errors
                        numberOfError += 1
            return returnArray.T  # Transpose To Ensure Each Word Lines Down [word1, word2.....]

        self.df["resume"] = self.df["resume"].apply(vectorizedResume)

    def _addPadding(self):
        paddingAmount = 1440

        # Adding Padding
        def addPadding(row):
            pad_width = ((0, 0), (0, paddingAmount - row.shape[1]))
            return np.pad(row, pad_width, constant_values=0)

        self.df["resume"] = self.df["resume"].apply(addPadding)

    def initializeResumes(self):
        try:
            self._preprocessResume()
            self._vectorize()
            self._addPadding()
            return True
        except Exception as exc:
            print(f"Error Processing Resumes\n{exc}")
            return False

    def getPredictions(self):
        try:
            reshaped_data = self.df["resume"].apply(lambda x: np.reshape(x, (1, x.shape[0], x.shape[1])))
            X = np.concatenate(reshaped_data.to_numpy(), axis=0)
        except IndexError or ValueError:  # Should investigate more later
            return

        preds = self.model.predict(X)
        returnPreds = {}

        for i, pred in enumerate(preds):
            returnPred = {}
            for j, percent in enumerate(pred):
                returnPred[INT_TO_CATG[j]] = percent * 100
            returnPreds[self.df["title"].iloc[i]] = returnPred
        return returnPreds

    def getGraphs(self, preds, save=False, show=False):
        for resumeName, pred in preds.items():
            plt.figure(figsize=(20, 6))
            sns.barplot(x=list(pred.values()), y=list(pred.keys()), orient="h")
            plt.xlabel("Percent Fit (%)")
            plt.ylabel("Job Description")
            plt.title(resumeName)
            plt.savefig(f"savedFigures/{resumeName[:-4]}.svg") if save else None
            plt.show() if show else None

    def rank(self, preds, job):
        returnList = []
        for resumeName, pred in preds.items():
            returnList.append({
                "name": resumeName,
                "percent": pred[job],
                "resumePath": self.resumePath + "/" + resumeName,
                "graphPath": os.getcwd() + f"/savedFigures/{resumeName[:-4]}.svg"
            })
        return sorted(returnList, key=lambda x: x["percent"], reverse=True)


if __name__ == "__main__":
    model = Model("test")
    model.initializeResumes()
    predictions = model.getPredictions()
    print(model.rank(predictions, "Database"))
