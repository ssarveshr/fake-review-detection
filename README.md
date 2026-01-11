# Fake Review Detection System

A full-stack application designed to detect fake reviews using Machine Learning. The system consists of a React frontend, an Express backend, and a Python Flask ML service.

## 🚀 Tech Stack

### Frontend
- **React** (Vite)
- **Tailwind CSS** (Styling)
- **Framer Motion** (Animations)
- **Axios** (API Requests)

### Backend
- **Node.js & Express**
- **MongoDB** (Mongoose)
- **Dotenv** (Environment Management)

### ML Service
- **Python** (Flask)
- **Scikit-learn** (Machine Learning Model)
- **Pickle** (Model Serialization)

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/ssarveshr/fake-review-detection.git
cd fake-review-detection
```

### 2. Machine Learning Service
The ML service runs on port `5000`.

```bash
cd ml-service
# Optional: Create a virtual environment
# python -m venv venv
# source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (ensure you have these packages installed)
pip install flask scikit-learn pandas

# Run the service
python app.py
```

### 3. Backend API
The backend server runs on port `3000` (default) or as configured.

```bash
cd backend
npm install
npm start
```
*Note: Ensure you have a `.env` file in the `backend` directory if required by the code.*

### 4. Frontend Application
The frontend runs on port `5173`.

```bash
cd frontend
npm install
npm run dev
```

---

## 📡 API Endpoints

### Backend
- `POST /api/reviews/analyze` - Sends review to ML service and saves result.
- `GET /api/reviews` - Fetches past analyzed reviews.

### ML Service
- `POST /predict` - Accepts JSON `{ "review": "text" }` and returns prediction.

## 📝 Usage
1. Open the frontend in your browser.
2. Enter a product review in the text area.
3. Click **Analyze**.
4. The system will display whether the review is **Fake** or **Genuine** along with a confidence score.
