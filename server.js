const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de razas de perros' });
});

app.get('/api/breeds', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching dog breeds:', error);
    res.status(500).json({ message: 'Error fetching dog breeds' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes