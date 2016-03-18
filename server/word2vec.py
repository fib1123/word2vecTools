# encoding=utf8
import sys

reload(sys)
sys.setdefaultencoding('utf8')

import polyglot
from polyglot.mapping import Embedding
from polyglot.text import Text


def transform_text(embeddings, text):
    parsedText = Text(text)
    result = ""
    for sentence in parsedText.sentences:
        for word in sentence.words:
            res_word = word
            if word in embeddings and len(word) > 2:
                nearest = embeddings.nearest_neighbors(word, top_k=1)
                res_word = nearest[0]

            if word == "," or word == ".":
                result = result + res_word
            else:
                result = result + " " + res_word

    return result

def getKthNeighbour(embeddings, word, k):
    return embeddings.nearest_neighbors(word, top_k=k)[-1]