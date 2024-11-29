const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const eventRoutes= require('./routes/eventRoutes');
const eventDayRoutes = require('./routes/eventDayRoutes');
const itemRoutes = require('./routes/itemRoutes');
const mealRoutes = require('./routes/mealRoutes');
const cartRoutes = require('./routes/foodCartRoutes');

dotenv.config();

const app = express();
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/event', eventRoutes);
app.use('/api/v1/eventDay',eventDayRoutes);
app.use('/api/v1/item', itemRoutes);
app.use('/api/v1/meal', mealRoutes);
app.use('/api/v1/cart', cartRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));