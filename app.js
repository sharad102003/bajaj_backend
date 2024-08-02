const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const userId = "john_doe_17091999";
const email = "john@xyz.com";
const rollNumber = "ABCD123";

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    if (!data) {
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

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
    const highestAlphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? -1 : 1)[0]] : [];

    return res.json({
        is_success: true,
        user_id: userId,
        email,
        roll_number: rollNumber,
        numbers,
        alphabets,
        highest_alphabet: highestAlphabet
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
