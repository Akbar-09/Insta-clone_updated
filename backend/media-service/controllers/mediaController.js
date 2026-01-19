const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Storage Strategy
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
}).single('file'); // Expect field name 'file'

const uploadMedia = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Construct public URL (assuming Gateway maps /media/uploads -> media-service/uploads or similar)
        // For now, return a relative path or a direct service URL
        const fileUrl = `/uploads/${req.file.filename}`;

        res.status(201).json({
            status: 'success',
            data: {
                url: fileUrl,
                filename: req.file.filename,
                mimetype: req.file.mimetype,
                size: req.file.size
            }
        });
    });
};

module.exports = { uploadMedia };
