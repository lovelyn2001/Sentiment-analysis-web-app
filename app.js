const express = require('express');
const multer = require('multer');
const Sentiment = require('sentiment');
const compromise = require('compromise');

const app = express();
const upload = multer();

// Serve static files
app.use(express.static('public'));

// Setup EJS for rendering views
app.set('view engine', 'ejs');
app.set('views', 'views');

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.post('/analyze', upload.none(), (req, res) => {
    const text = req.body.text;

    // Sentiment analysis
    const sentiment = new Sentiment();
    const sentimentResult = sentiment.analyze(text);

    // Entity extraction
    const doc = compromise(text);
    const entities = doc.people().out('array');

    // Respond with results
    res.json({
        sentiment: sentimentResult,
        entities: entities
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
