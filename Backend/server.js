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

// Serve static files
app.use('/images', express.static('public/images'));

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
                    "title": "Leather Jacket",
                    "category": "clothing",
                    "price": 270.00,
                    "description": "Our Classic Leather Jacket combines timeless style with modern comfort. Made from high-quality genuine leather, this jacket is designed to last and age beautifully over time. Whether you're hitting the road or heading out for a night on the town, this versatile jacket is sure to become a staple in your wardrobe. Don't miss out on the perfect blend of style, comfort, and durability. Order yours today!",
                    "image": "http://localhost:5001/images/jacket_leather.jpg"
                },
                {
                    "title": "Top",
                    "category": "clothing",
                    "price": 95.00,
                    "description": "95% wool 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
                    "image": "http://localhost:5001/images/top.jpg"
                },
                {
                    "title": "Brown Winter Coat",
                    "category": "clothing",
                    "price": 200.00,
                    "description": "Stay warm and stylish this winter with our Warmth Essentials Brown Winter Coat. Crafted from premium materials, this coat offers superior insulation and protection against the elements. The classic design ensures it will never go out of style, making it a timeless addition to your winter wardrobe. With practical features like a detachable hood, multiple pockets, and a tailored fit.",
                    "image": "http://localhost:5001/images/coat.jpg"
                },
                {
                    "title": "Elegant White Silk Skirt",
                    "category": "clothing",
                    "price": 150.00,
                    "description": "Our Elegant White Silk Skirt is the epitome of sophistication and luxury. Crafted from 100% pure silk, it offers a smooth, lustrous finish that feels as good as it looks. The A-line silhouette and high-waisted design create a flattering shape, while the delicate hand-finished hemline and subtle side slit add a touch of refinement.",
                    "image": "http://localhost:5001/images/skirt.jpg"
                },
                {
                    "title": "Urban Comfort Grey Sneakers",
                    "category": "shoes",
                    "price": 120.00,
                    "description": "Step into comfort and style with our Urban Comfort Grey Sneakers. Crafted from premium materials, these sneakers offer a perfect blend of durability and modern design. The cushioned EVA midsole and removable insole provide exceptional support, making them ideal for all-day wear. Whether you're exploring the city, heading to a casual outing, or engaging in light athletic activities, these versatile sneakers will keep you looking and feeling great. Experience the perfect combination of comfort and style—order your pair today!",
                    "image": "http://localhost:5001/images/sneackers.jpg"
                },
                {
                    "title": "Artisan Beige Handmade Bag",
                    "category": "bag",
                    "price": 85.00,
                    "description": "Our Artisan Beige Handmade Bag combines style, functionality, and sustainability. Crafted from natural cotton canvas, this bohemian-chic tote is perfect for everyday use. The spacious interior and multiple pockets provide ample storage, while the handcrafted quality ensures each bag is unique. With its versatile design and eco-friendly materials, this bag is a must-have accessory for any wardrobe.",
                    "image": "http://localhost:5001/images/bag_beige.jpg"
                },
                {
                    "title": "Elegant Stiletto High Heels",
                    "category": "shoes",
                    "price": 95.00,
                    "description": "Step into elegance with our Elegant Stiletto High Heels. Crafted from premium patent leather, these heels offer a luxurious look and feel. The classic design, combined with a comfortable cushioned insole and supportive arch, makes them perfect for any occasion. Whether you're attending a formal event, heading to the office, or enjoying a night out, these versatile heels will elevate your style. Experience the perfect blend of sophistication and comfort.",
                    "image": "http://localhost:5001/images/silver-shoes-high-heels.jpg"
                },
                {
                    "title": "Shimmering Silver Sandals",
                    "category": "shoes",
                    "price": 75.00,
                    "description": "Our Shimmering Silver Sandals combine style, comfort, and versatility. The glittering metallic finish adds a touch of glamour to any outfit, these sandals will elevate your look.",
                    "image": "http://localhost:5001/images/silver_sandals.jpg"
                },
                {
                    "title": "Graceful Pink Elegant High Heels",
                    "category": "shoes",
                    "price": 110.00,
                    "description": "Step into elegance with our Graceful Pink Elegant High Heels. Crafted from premium satin fabric, these heels offer a luxurious and refined look. The classic pointed toe design, combined with a comfortable cushioned insole and supportive arch, makes them perfect for any special occasion. Whether you're attending a wedding, a formal event, or an evening outing, these versatile heels will elevate your style.",
                    "image": "http://localhost:5001/images/pink_high_heels.jpg"
                },
                {
                    "title": "Chic Silver Swag Necklace",
                    "category": "jewelry",
                    "price": 60.00,
                    "description": "Our Chic Silver Swag Necklace is designed for the modern fashionista. With its trendy multiple-layer design and high-polish finish, this necklace adds a touch of glamour to any outfit. The cascading chains and elegant silver beads create a sophisticated and stylish look, perfect for both casual and semi-formal occasions. Whether you're dressing up for a night out or adding a chic touch to your everyday wear.",
                    "image": "http://localhost:5001/images/silver-rings-jewelry.jpg"
                },
                {
                    "title": "Classic Leather Handbag",
                    "category": "bag",
                    "price": 150.00,
                    "description": "Our Classic Leather Handbag combines elegance, functionality, and timeless style. Made from high-quality genuine leather, this bag is designed to last and improve with age. With its versatile design, spacious interior, and multiple pockets, it meets all your organizational needs while maintaining a chic and sophisticated appearance. Whether you're heading to the office, out for a casual day, or traveling, this handbag is the perfect accessory.",
                    "image": "http://localhost:5001/images/leather_bag.jpg"
                },
                {
                    "title": "Timeless Elegance Necklace",
                    "category": "jewelry",
                    "price": 70.00,
                    "description": "Our Timeless Elegance Necklace is crafted for those who appreciate classic beauty and sophistication. This necklace exudes luxury and charm. The adjustable length and secure lobster claw clasp ensure a perfect fit and easy wear. Whether you're attending a special event, celebrating a milestone, or simply want to add a touch of elegance to your everyday attire.",
                    "image": "http://localhost:5001/images/silver_necklace.jpg"
                },
                {
                    "title": "Glamorous Bow and Zircon High Heels",
                    "category": "shoes",
                    "price": 130.00,
                    "description": "Our Glamorous Bow and Zircon High Heels are designed to make you feel elegant and confident on special occasions. Crafted from luxurious satin fabric and adorned with sparkling zircon crystals, these heels add a touch of glamour to any outfit. The chic bow detail enhances their femininity, while the cushioned leather insole ensures comfort for extended wear. Whether you're walking down the aisle, attending a gala, or celebrating a milestone, these heels will elevate your style effortlessly. Experience the perfect blend of elegance and comfort.",
                    "image": "http://localhost:5001/images/silver-shoes-high-heels.jpg"
                },
                {
                    "title": "Floral Charm Green Short Skirt",
                    "category": "clothing",
                    "price": 80.00,
                    "description": "Our Floral Charm Green Short Skirt is a delightful addition to your summer wardrobe. Featuring a vibrant green hue and a charming floral print, this skirt exudes freshness and femininity. The lightweight cotton blend ensures comfort and breathability, making it ideal for warm weather. Whether you're heading to the beach, enjoying a casual outing.",
                    "image": "http://localhost:5001/images/Green_skirt.jpg"
                }
            ];
            
            ;

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
