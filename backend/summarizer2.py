import nltk
from sentence_transformers import SentenceTransformer, util
from modelCNN import Model
import numpy as np
import LexRank
from LexRank import degree_centrality_scores

model = SentenceTransformer('all-MiniLM-L6-v2')

document = Model.initializeResumes()

sentences = nltk.sent_tokenize(document)
print("Num sentences:", len(sentences))
embeddings = model.encode(sentences, convert_to_tensor=True)
cos_scores = util.cos_sim(embeddings, embeddings).numpy()
centrality_scores = degree_centrality_scores(cos_scores, threshold=None)
most_central_sentence_indices = np.argsort(-centrality_scores)