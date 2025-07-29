const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload())

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }

    const files = Object.values(req.files);

    files.forEach(file => {
        const ext = path.extname(file.name).toLowerCase();
        let uploadDir = '';

        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            uploadDir = path.join(__dirname, 'uploads/foto');
        } else if (['.mp4', '.avi', '.mkv', '.webm', '.mov'].includes(ext)) {
            uploadDir = path.join(__dirname, 'uploads/video');
        } else {
            return; // Skip unsupported files
        }

        // Pastikan direktori ada
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const uploadPath = path.join(uploadDir, file.name);
        file.mv(uploadPath, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });

    res.json({ success: true, message: 'File berhasil diunggah dan dipisah berdasarkan jenisnya.' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});