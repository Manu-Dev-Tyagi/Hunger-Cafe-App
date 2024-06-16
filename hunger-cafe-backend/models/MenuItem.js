const mongoose = require('mongoose');

// Define the schema for a menu item
const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Menu item price is required'],
    min: [0, 'Price must be a positive number'],
  },
  description: {
    type: String,
    required: [true, 'Menu item description is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Menu item category is required'],
    trim: true,
    enum: ['Breakfast', 'Main Course', 'Salads', 'Beverages', 'Desserts'], // Added all necessary categories
  },
  available: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v);
      },
      message: props => `${props.value} is not a valid image URL!`
    },
    required: [true, 'Menu item image URL is required']
  }
}, {
  timestamps: true,
});

// Create a Mongoose model from the schema
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
