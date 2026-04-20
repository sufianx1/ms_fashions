const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Initialize the Express app
const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/msfashion', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware for JWT Authentication
app.use((req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'your_secret_key', (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded;
            next();
        });
    } else {
        res.sendStatus(401);
    }
});

// Route handlers
app.get('/api/items', (req, res) => {
    res.send('List of items');
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    res.status(201).send(`Item created: ${newItem.name}`);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});