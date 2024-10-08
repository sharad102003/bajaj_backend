const express = require('express');
const bodyParser = require('body-parser');
const atob = require('atob');  // Use to decode Base64
const app = express();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(bodyParser.json());

app.post('/bfhl', (req, res) => {
    const { data, file_b64, email, roll_number } = req.body;

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(char => /[a-z]/.test(char));
    
    // Get the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length 
        ? [lowercaseAlphabets.sort().reverse()[0]] 
        : [];

    // File validation
    let fileValid = false;
    let mimeType = '';
    let fileSizeKB = 0;

    if (file_b64) {
        try {
            const fileBuffer = Buffer.from(file_b64, 'base64');
            mimeType = 'application/octet-stream';  // Default MIME type
            fileSizeKB = Math.round(fileBuffer.length / 1024);
            fileValid = true;
        } catch (e) {
            fileValid = false;
        }
    }

    res.json({
        is_success: true,
        user_id: "your_name_dob",  // Replace with actual name and DOB
        email: email || "your_email@example.com",
        roll_number: roll_number || "your_roll_number",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid: fileValid,
        file_mime_type: mimeType,
        file_size_kb: fileSizeKB
    });
});

app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Start server





