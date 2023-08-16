import nltk
from sentence_transformers import SentenceTransformer
from lexrank import LexRank
import re

model = SentenceTransformer('all-MiniLM-L6-v2')

lx = LexRank(stopwords=["en"])

def summarize(document):

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
            return uncleanedText.lower()  # Lowercase everything
    
    rawText = cleanData(document)
    sentences = nltk.sent_tokenize(rawText)
    embeddings = model.encode(sentences, convert_to_tensor=True) 
    summary = lx.get_summary(embeddings, summary_size=5, threshold=.2)
    return summary

if __name__ == "__main__":
    print(summarize([]))