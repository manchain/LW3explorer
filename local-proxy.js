const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const app = express();

// Configure CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept'],
  credentials: true
}));

// Proxy middleware configuration
const apiProxy = createProxyMiddleware({
  target: 'http://64.227.185.193:3009',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
  onError: (err, req, res) => {
    console.error('Proxy Error:', err);
    res.status(500).send('Proxy Error');
  }
});

// Use proxy for all /api routes
app.use('/api', apiProxy);

// Add transaction endpoint
app.get('/api/transaction/:hash', async (req, res) => {
  try {
    const response = await axios.get(`http://64.227.185.193:3009/transaction/${req.params.hash}`);
    res.json(response.data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to fetch transaction data' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.send('Proxy server is running');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
}); 