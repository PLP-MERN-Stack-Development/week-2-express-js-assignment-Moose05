// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());


// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  },
  {
    id: '4',
    name: 'Ice Maker',
    description: 'Programmable ice maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  },
  {
    id: '5',
    name: 'Foam Maker',
    description: 'Programmable foam maker with timer',
    price: 250,
    category: 'kitchen',
    inStock: true
  },
  {
    id: '6',
    name: '512GB SSD',
    description: '512gb SSD with 6Gbps write speeds',
    price: 250,
    category: 'electronics',
    inStock: true
  },
  {
    id: '7',
    name: '128GB SSD',
    description: '128GB SSD with 6Gbps write speeds',
    price: 200,
    category: 'electronics',
    inStock: true
  },
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products',(req,res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params; 
  const product = products.find(p => p.id === id);

  if (!product){
    return res.status(404).json({
      message: `product with ID ${id} not found.`});
  }

  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock} = req.body;

  if (!name || !price || !category){
    return res.status(400).json({message:
    'Name, price, and category are required.'});
  }
  const newProduct ={
    id: uuidv4(),
    name,
    description: description || '',
    price,
    category,
    inStock: inStock ?? true
  };

products.push(newProduct);
res.status(201).json(newProduct);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) =>{
  const { id } = req.params;
  const { name, description, price, category, inStock} = req.body;

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `Product with ID ${ID} not found.`
    });
  }

  const existingProduct = products[index];

  products[index] ={
    ...existingProduct,
    name: name ?? existingProduct.name,
    description: description ?? existingProduct.description,
    price: price ?? existingProduct.price,
    category: category ?? existingProduct.category,
    inStock: inStock ?? existingProduct.inStock
  };
  res.json(products[index]);
});
// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id',(req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `Product with ID ${id} not found`
    });
  }
  const deletedProduct = products.splice(index, 1)[0];
  res.json({
    message: `Product with ID ${id} has been deleted`,
    deleted: deletedProduct
  });
});
// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 