// Server entry point
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const axios = require("axios");
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.post("/api/review/predict", async (req, res) => {
    try {
        const { review } = req.body;

        if (!review) {
            return res.status(400).json({ error: "Review text is required" });
        }

        // Call ML service
        const response = await axios.post("http://localhost:5000/predict", {
            review: review
        });

        res.json({
            review,
            prediction: response.data.prediction,
            confidence: response.data.confidence
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "ML service error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
