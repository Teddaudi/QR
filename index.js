const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const QR = require('./routes/qr.route')
dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 3000;
const uri = "mongodb+srv://daudited:VFT4LzVeYGgdKMuk@qr.h2ooh.mongodb.net/?retryWrites=true&w=majority&appName=QR";

mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => {
        console.log("Connected to database successfully");
    })
    .catch((error) => {
        console.log("Database connection error:", error.message);
    });

// app.use('/booking', booking);
// app.use('/contact', contact);

app.use('/qrcodes', express.static(path.join(__dirname, 'public', 'qrcodes')));

app.use('/qr', QR)

app.use('/', (req, res) => {
    return res.send("Welcome to apis");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
