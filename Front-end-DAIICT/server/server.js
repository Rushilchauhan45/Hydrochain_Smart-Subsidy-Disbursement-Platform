const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));

// Test route
app.get('/', (req, res) => {
  res.send('Hydrochain API is running');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
