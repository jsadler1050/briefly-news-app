// server.js
const express = require('express');
const fetch = require('node-fetch'); // ✅ Import fetch from node-fetch
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/news', async (req, res) => {
  const category = req.query.category || 'general';
  const apiKey = process.env.NEWS_API_KEY;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
