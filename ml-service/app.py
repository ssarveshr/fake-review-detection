from flask import Flask, request, jsonify
import pickle
import re

app = Flask(__name__)

model = pickle.load(open("model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z ]", "", text)
    return text

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    review = clean_text(data["review"])

    vector = vectorizer.transform([review])
    prediction = model.predict(vector)[0]
    confidence = max(model.predict_proba(vector)[0])

    return jsonify({
        "prediction": "Fake" if prediction == 1 else "Genuine",
        "confidence": round(confidence * 100, 2)
    })

if __name__ == "__main__":
    app.run(port=5000)
