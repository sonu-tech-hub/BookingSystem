// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const listingRoutes = require('./routes/listingRoutes');
const unitRoutes = require('./routes/unitRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); // Import review routes
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
 

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes); // Use review routes

app.get('/', (req, res) => {
  res.send('API is running...');
});
 
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
