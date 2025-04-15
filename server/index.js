const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const Product = require('./Product');
console.log(Product);
const Cart = require('./Cart');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API');
});
app.post('/api/products', async(req,res)=>{
    try{
        const {name,price,description,image} =  req.body;
        const newProduct = new Product({
            name,
            price,
            description,
            image,
        });
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch(error){
        res.status(500).json({error:'Failed to add product',details:error.message});
    }
});
app.get('/api/products',async(req,res)=>{
    try{
        const products = await Product.find();
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error:"Failed to fetch products",details:error.message});
    }
});
app.post('/api/cart',async(req,res)=>{
    try{
        const {productId,name,price,description,image,quantity}=req.body;
        const existingCartItem = await Cart.findOne({productId});
        if(existingCartItem){
            existingCartItem.quantity += quantity;
            const updatedCartItem = await existingCartItem.save();
            return res.status(200).json(updatedCartItem);
        }
        const newCartItem = new Cart({
            productId,
            name,
            price,
            description,
            image,
            quantity,
        });
        const savedCartItem = await newCartItem.save();
        res.status(201).json(savedCartItem);
    }catch(error){
        res.status(201).json({error:'Failed to add item to cart',details:error.message});
    }
});
app.get('/api/cart',async(req,res)=>{
    try{
        const cartItems = await Cart.find();
        res.status(200).json(cartItems);
    }catch(error){
        res.status(500).json({error:'Failed to fetch cart items',details: error.message});
    }
});
// Update a cart item's quantity
app.put('/api/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        // Validate the id format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid cart item ID format' });
        }

        // Find and update the cart item
        const updatedCartItem = await Cart.findByIdAndUpdate(
            id,
            { quantity },
            { new: true } // Return the updated document
        );

        if (!updatedCartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json(updatedCartItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update cart item', details: error.message });
    }
});
// Delete a cart item

app.delete('/api/cart/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the id format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid cart item ID format' });
        }

        const deletedCartItem = await Cart.findByIdAndDelete(id);

        if (!deletedCartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove cart item', details: error.message });
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});