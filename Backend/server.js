const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = 'your_secret_key';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./users.db'); // Use a file-based database

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY, 
        username TEXT UNIQUE, 
        password TEXT, 
        fullname TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY,
        title TEXT,
        category TEXT,
        price REAL,
        description TEXT,
        image TEXT
    )`);

    // Insert some example products if table is empty
    db.get('SELECT COUNT(*) AS count FROM products', (err, row) => {
        if (row.count === 0) {
            const products = [
                {
                    title: 'Product 1',
                    category: 'electronics',
                    price: 99.99,
                    description: 'This is product 1 description.',
                    image: 'https://example.com/product1.jpg'
                },
                {
                    title: 'Product 2',
                    category: 'clothing',
                    price: 49.99,
                    description: 'This is product 2 description.',
                    image: 'https://example.com/product2.jpg'
                }
                // Add more products as needed
            ];

            const insertProducts = db.prepare(`INSERT INTO products (title, category, price, description, image) VALUES (?, ?, ?, ?, ?)`);
            products.forEach(product => {
                insertProducts.run(product.title, product.category, product.price, product.description, product.image);
            });
            insertProducts.finalize();
        }
    });
});

// Fetch all products endpoint
app.get('/api/products', (req, res) => {
    db.all(`SELECT * FROM products`, (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
        } else {
            res.json(rows);
        }
    });
});

// Fetch a single product by ID endpoint
app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    db.get(`SELECT * FROM products WHERE id = ?`, [productId], (err, row) => {
        if (err) {
            console.error('Error fetching product:', err);
            res.status(500).json({ error: 'Failed to fetch product' });
        } else if (!row) {
            res.status(404).json({ error: 'Product not found' });
        } else {
            res.json(row);
        }
    });
});

// Fetch products by category endpoint
app.get('/api/products/category/:category', (req, res) => {
    const category = req.params.category;
    db.all(`SELECT * FROM products WHERE category = ?`, [category], (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Failed to fetch products' });
        } else {
            res.json(rows);
        }
    });
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, password, fullname } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(`INSERT INTO users (username, password, fullname) VALUES (?, ?, ?)`, [username, hashedPassword, fullname], function (err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    });
});

// Contact form endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'khzarrouki@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
    const { category } = req.params;
    db.all(`SELECT * FROM products WHERE category = ?`, [category], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Get unique categories
app.get('/api/categories', (req, res) => {
    db.all(`SELECT DISTINCT category FROM products`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
