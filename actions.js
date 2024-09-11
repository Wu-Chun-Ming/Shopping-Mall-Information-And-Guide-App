const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Serve static files (for serving uploaded images)
app.use('/uploads', express.static('uploads'));

// Create an 'uploads' folder if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to prevent file name conflicts
    }
});
const upload = multer({ storage: storage });

// Connect to SQLite database
const db = new sqlite3.Database('./mall_info.db', (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create a new user with picture
app.post('/users', upload.single('user_picture'), (req, res) => {
    const { user_name, user_email, user_contact, password } = req.body;
    const user_picture = req.file ? req.file.path : null;
    db.run(`INSERT INTO user (user_name, user_email, user_contact, password, user_picture) VALUES (?, ?, ?, ?, ?)`, 
    [user_name, user_email, user_contact, password, user_picture], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ userId: this.lastID, user_picture });
    });
});

// Add a store with picture
app.post('/stores', upload.single('store_picture'), (req, res) => {
    const { sname, store_description, store_contact, store_location, store_map } = req.body;
    const store_picture = req.file ? req.file.path : null;
    db.run(`INSERT INTO store (sname, store_description, store_contact, store_location, store_map, store_picture) 
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [sname, store_description, store_contact, store_location, store_map, store_picture], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ storeId: this.lastID, store_picture });
    });
});

// Add an event with picture
app.post('/events', upload.single('event_picture'), (req, res) => {
    const { ename, event_description, event_location, event_map } = req.body;
    const event_picture = req.file ? req.file.path : null;
    db.run(`INSERT INTO event (ename, event_description, event_location, event_map, event_picture) 
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [ename, event_description, event_location, event_map, event_picture], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(201).json({ eventId: this.lastID, event_picture });
    });
});

// Get all stores
app.get('/stores', (req, res) => {
    db.all(`SELECT * FROM store`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get all events
app.get('/events', (req, res) => {
    db.all(`SELECT * FROM event`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get all users
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM user`, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
