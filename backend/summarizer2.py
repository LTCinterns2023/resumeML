import nltk
from sentence_transformers import SentenceTransformer, util
from modelCNN import Model
import numpy as np
from lexrank import LexRank
from LexRank import degree_centrality_scores

model = SentenceTransformer('all-MiniLM-L6-v2')

lx = LexRank(stopwords=["en"])


def summarize(document):
    document = Model.initializeResumes()
    for text in document:
        sentences = nltk.sent_tokenize(document)
        embeddings = model.encode(sentences, convert_to_tensor=True) 

    summary = lx.get_summary(embeddings, summary_size=5, threshold=.2)
    return summary

if __name__ == "__main__":
    print(summarize())