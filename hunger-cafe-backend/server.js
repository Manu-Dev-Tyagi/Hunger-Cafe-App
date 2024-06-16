const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const menuRoutes = require('./routes/menu'); // Adjust this based on your actual routes setup
const populateMenu = require('./populateMenu'); // Import the populateMenu function

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hungercafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    await clearDatabase(); // Clear the database
    await populateMenu(); // Populate the database with new items
  } catch (error) {
    console.error('Error during database initialization:', error);
  }
});
db.on('error', err => {
  console.error('MongoDB connection error:', err);
});

// Function to clear the database
async function clearDatabase() {
  try {
    await mongoose.connection.collection('menuitems').deleteMany({});
    console.log('Database cleared');
  } catch (error) {
    console.error('Error clearing database:', error);
  }
}

// Routes
app.use('/api/menu', menuRoutes); // Mount menu routes under /api/menu

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
