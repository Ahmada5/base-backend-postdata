const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse URL-encoded form data and JSON data
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parses JSON data

// Multer setup to handle file uploads and form data
const upload = multer();

// Route to handle the POST request
app.post('/multipartjson1', upload.none(), (req, res) => {
    // Log the raw received data
    console.log('Received Data:', req.body);

    if (!req.body) {
        return res.status(400).json({ message: 'No data received' });
    }

    // Reconstruct the buildings array
    const buildings = [];
    let i = 0;

    // Check if the buildings data is present and construct the array
    while (req.body[`buildings[${i}][floor]`]) {
        buildings.push({
            floor: req.body[`buildings[${i}][floor]`],
            heads: req.body[`buildings[${i}][heads]`],
            employees: req.body[`buildings[${i}][employees]`]
        });
        i++;
    }

    console.log('Parsed Buildings:', buildings);

    // Example response to the frontend
    res.json({
        message: 'Institution data received successfully',
        receivedData: {
            id: req.body.id,
            name: req.body.name,
            subname: req.body.subname,
            buildings: buildings // Send back the reconstructed buildings array
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
