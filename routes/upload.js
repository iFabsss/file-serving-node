import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Set storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// File type validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        return cb(new Error('Only images (JPG, PNG) and documents (PDF, TXT) are allowed!'));
    }
};

// Upload middleware
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Serve the upload form
router.get('/', (req, res) => {
    res.render('index', { message: null });
});

// Handle file upload
router.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.render('index', { message: 'No file uploaded!' });
    }
    res.render('index', { message: 'File uploaded successfully!' });
});

// Handle errors
router.use((err, req, res, next) => {
    res.render('index', { message: err.message });
});

export default router;
