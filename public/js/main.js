
document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const text = document.getElementById('textInput').value;

    const formData = new FormData();
    if (text) formData.append('text', text);

    const response = await fetch('/analyze', {
        method: 'POST',
        body: formData
    });
    const result = await response.json();

    // Determine the main sentiment
    let mainSentiment = 'Neutral';
    if (result.sentiment.score > 0) {
        mainSentiment = 'Positive';
    } else if (result.sentiment.score < 0) {
        mainSentiment = 'Negative';
    }

    // Display the main sentiment prominently
    document.getElementById('mainSentiment').textContent = `Main Sentiment: ${mainSentiment}`;

    // Display the detailed breakdown
    document.getElementById('detailedBreakdown').innerHTML = `
        <p>Score: ${result.sentiment.score}</p>
        <p>Comparative: ${result.sentiment.comparative}</p>
        <p>Positive Words: ${result.sentiment.positive.join(', ') || 'None'}</p>
        <p>Negative Words: ${result.sentiment.negative.join(', ') || 'None'}</p>
    `;

    // Display the extracted entities
    document.getElementById('entitiesResult').textContent = result.entities.length > 0 ? result.entities.join(', ') : 'No entities detected';

    // Show the results section
    document.getElementById('resultSection').classList.remove('hidden');
});
