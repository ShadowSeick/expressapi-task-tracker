const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load config
dotenv.config({ path: './config/config.env' });

connectDB()

const app = express();

app.use(express.json());

// ROUTES
const tasksRoute = require('./routes/tasks');

app.use('/', tasksRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT);