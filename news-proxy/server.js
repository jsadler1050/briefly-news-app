// server.js
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 3001;

// Proxy endpoint for news
app.get('/news', async (req, res) => {
  const category = req.query.category || 'general';
  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'BrieflyNewsApp'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `NewsAPI error: ${response.status}` });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
