const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); // Adjust based on your actual model location

// Route to get all menu items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get a single menu item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (err) {
    console.error('Error fetching menu item by ID:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid menu item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to create a new menu item
router.post('/', async (req, res) => {
  const { name, price, description, category, available, imageUrl } = req.body;
  try {
    const newMenuItem = new MenuItem({ name, price, description, category, available, imageUrl });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (err) {
    console.error('Error creating menu item:', err);
    res.status(400).json({ message: 'Error creating menu item', errors: err.errors });
  }
});

// Route to update a menu item by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, available, imageUrl } = req.body;
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, price, description, category, available, imageUrl },
      { new: true, runValidators: true }
    );
    if (!updatedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(updatedMenuItem);
  } catch (err) {
    console.error('Error updating menu item:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid menu item ID' });
    }
    res.status(400).json({ message: 'Error updating menu item', errors: err.errors });
  }
});

// Route to delete a menu item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    console.error('Error deleting menu item:', err);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid menu item ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
