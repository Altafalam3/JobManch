from flask import Flask, render_template, request, jsonify
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = Flask(__name__)

tokenizer = AutoTokenizer.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')
model = AutoModelForSequenceClassification.from_pretrained('nlptown/bert-base-multilingual-uncased-sentiment')

def sentiment_score(review):
    tokens = tokenizer.encode(review, return_tensors='pt')
    result = model(tokens)
    return int(torch.argmax(result.logits)) + 1

@app.route('/sentiment', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    review = data['review']
    score = sentiment_score(review)
    if score == 1:
        sentiment = "Negative"
    elif score == 2:
        sentiment = "Negative"
    elif score == 3:
        sentiment = "Neutral"
    elif score == 4:
        sentiment = "Positive"
    else:
        sentiment = "Positive"
    return jsonify({'sentiment': [score, sentiment]})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
