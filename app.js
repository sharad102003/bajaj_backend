const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
    origin: '*', // Allow all origins (use specific origin in production)
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions)); // Use CORS middleware
app.use(bodyParser.json());

// Constants
const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

// Middleware for logging requests
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        console.log('Request body:', req.body); // Log the request body

        const { data } = req.body;

        if (!Array.isArray(data)) {
            console.log('Invalid data format'); // Log if data is not an array
            return res.status(400).json({
                is_success: false,
                user_id: userId,
                email,
                roll_number: rollNumber,
                numbers: [],
                alphabets: [],
                highest_alphabet: []
            });
        }

        const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
        const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]] : [];

        console.log('Response data:', {
            is_success: true,
            user_id: userId,
            email,
            roll_number: rollNumber,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        }); // Log the response data

        return res.json({
            is_success: true,
            user_id: userId,
            email,
            roll_number: rollNumber,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (err) {
        console.error('Internal Server Error:', err); // Log the error
        return res.status(500).json({
            is_success: false,
            message: 'Internal Server Error',
            error: err.message
        });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
