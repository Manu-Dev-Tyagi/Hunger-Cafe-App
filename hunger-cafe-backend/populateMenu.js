const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem'); // Adjust the path based on your project structure

async function populateMenu() {
  const menuItemsData = [
    // Add your items here
    { name: 'Pancakes', price: 5.99, description: 'Fluffy pancakes served with maple syrup and butter.', category: 'Breakfast', available: true, imageUrl: 'https://example.com/images/pancakes.jpg' },
    { name: 'French Toast', price: 6.99, description: 'Golden brown French toast served with powdered sugar and fresh berries.', category: 'Breakfast', available: true, imageUrl: 'https://example.com/images/french-toast.jpg' },
    { name: 'Cheeseburger', price: 8.99, description: 'Juicy beef patty with cheese, lettuce, tomato, and pickles on a sesame seed bun.', category: 'Main Course', available: true, imageUrl: 'https://example.com/images/cheeseburger.jpg' },
    { name: 'Veggie Burger', price: 7.99, description: 'Grilled veggie patty with lettuce, tomato, and avocado on a whole grain bun.', category: 'Main Course', available: true, imageUrl: 'https://example.com/images/veggie-burger.jpg' },
    { name: 'Grilled Chicken Sandwich', price: 9.49, description: 'Grilled chicken breast with lettuce, tomato, and mayo on a brioche bun.', category: 'Main Course', available: true, imageUrl: 'https://example.com/images/grilled-chicken-sandwich.jpg' },
    { name: 'Caesar Salad', price: 6.99, description: 'Romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.', category: 'Salads', available: true, imageUrl: 'https://example.com/images/caesar-salad.jpg' },
    { name: 'Greek Salad', price: 7.49, description: 'Mixed greens with feta cheese, olives, cucumbers, and Greek dressing.', category: 'Salads', available: true, imageUrl: 'https://example.com/images/greek-salad.jpg' },
    { name: 'Coffee', price: 2.99, description: 'Freshly brewed hot coffee.', category: 'Beverages', available: true, imageUrl: 'https://example.com/images/coffee.jpg' },
    { name: 'Iced Coffee', price: 3.49, description: 'Chilled coffee served over ice.', category: 'Beverages', available: true, imageUrl: 'https://example.com/images/iced-coffee.jpg' },
    { name: 'Smoothie', price: 4.99, description: 'Mixed fruit smoothie with a choice of flavors.', category: 'Beverages', available: true, imageUrl: 'https://example.com/images/smoothie.jpg' },
    { name: 'Chocolate Cake', price: 5.49, description: 'Rich chocolate cake with a creamy chocolate frosting.', category: 'Desserts', available: true, imageUrl: 'https://example.com/images/chocolate-cake.jpg' },
    { name: 'Cheesecake', price: 5.99, description: 'Classic cheesecake with a graham cracker crust and strawberry topping.', category: 'Desserts', available: true, imageUrl: 'https://example.com/images/cheesecake.jpg' },
    { name: 'Ice Cream Sundae', price: 4.99, description: 'Vanilla ice cream topped with chocolate syrup, whipped cream, and a cherry.', category: 'Desserts', available: true, imageUrl: 'https://example.com/images/ice-cream-sundae.jpg' }
  ];

  try {
    await MenuItem.insertMany(menuItemsData);
    console.log('New items inserted successfully');
  } catch (error) {
    console.error('Error inserting new items:', error);
  }
}

module.exports = populateMenu;
