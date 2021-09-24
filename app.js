const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

connectDB()

const app = express();

app.use(express.json());

// Allow to be fetched as a origin control
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// ROUTES
const tasksRoute = require('./routes/tasks');

app.use('/', tasksRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT);