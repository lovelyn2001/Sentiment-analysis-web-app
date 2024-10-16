// document.getElementById('analyzeBtn').addEventListener('click', async () => {
//     const text = document.getElementById('textInput').value;
//     const file = document.getElementById('fileInput').files[0];
    
//     const formData = new FormData();
//     if (text) formData.append('text', text);
//     if (file) formData.append('file', file);

//     const response = await fetch('/analyze', {
//         method: 'POST',
//         body: formData
//     });
//     const result = await response.json();
    
//     // Display the result
//     document.getElementById('sentimentResult').textContent = JSON.stringify(result.sentiment, null, 2);
//     document.getElementById('entitiesResult').textContent = result.entities.join(', ');
//     document.getElementById('resultSection').classList.remove('hidden');
// });

document.getElementById('analyzeBtn').addEventListener('click', async () => {
    const text = document.getElementById('textInput').value;
    const file = document.getElementById('fileInput').files[0];

    const formData = new FormData();
    if (text) formData.append('text', text);
    if (file) formData.append('file', file);

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
