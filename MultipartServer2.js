const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse form data
const upload = multer();

// Middleware to parse urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // For JSON payloads (if necessary)

// Route to handle the POST request, using 'upload.none()' to parse the form data
app.post('/multipartjson2', upload.none(), (req, res) => {
    // Extract form data from req.body
    const { id, name, subname, buildings } = req.body;

    if (!id || !name || !subname || !buildings) {
        return res.status(400).json({ error: "Missing data in the request body." });
    }

    // Parse the buildings JSON string back into an array
    const parsedBuildings = JSON.parse(buildings);

    const receivedData = {
        id,
        name,
        subname,
        buildings: parsedBuildings,
    };

    console.log(receivedData);

    res.json({
        message: 'Data received successfully',
        receivedData
    });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
