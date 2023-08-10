from summarizer import Summarizer
from summarizer.sbert import SBertSummarizer
model = SBertSummarizer('paraphrase-MiniLM-L6-v2')
result = model(body, num_sentences=5)