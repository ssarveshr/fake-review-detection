import pandas as pd
import pickle
import re

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score

# Load dataset
try:
    df = pd.read_csv("fake reviews dataset.csv")
except FileNotFoundError:
    # Try absolute path or relative from root if running from root
    import os
    if os.path.exists("ml-service/fake reviews dataset.csv"):
        df = pd.read_csv("ml-service/fake reviews dataset.csv")
    else:
        raise

# Keep only required columns
df = df[["text_", "label"]]

# Rename columns
df.columns = ["text", "label"]

# Map labels
# CG (Computer Generated) -> 0, OR (Original) -> 1
df["label"] = df["label"].map({"CG": 0, "OR": 1})

# Drop nulls
df.dropna(inplace=True)

# Text cleaning
def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z ]", "", text)
    return text

df["text"] = df["text"].apply(clean_text)

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["label"], test_size=0.2, random_state=42
)

# TF-IDF
vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=5000
)

X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model
model = MultinomialNB()
model.fit(X_train_vec, y_train)

# Evaluate
preds = model.predict(X_test_vec)
print(f"Accuracy: {accuracy_score(y_test, preds)}")

# Save
pickle.dump(model, open("model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("[SUCCESS] Model and vectorizer saved")
