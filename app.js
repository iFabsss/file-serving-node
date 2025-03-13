import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRoute from './routes/upload.js';

// Fix __dirname issue in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Use routes
app.use('/', uploadRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
