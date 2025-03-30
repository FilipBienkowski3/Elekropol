const express = require('express');
const router = express.Router();
const models = require('../db');

router.get('/', async (req, res) => {
  try {
    const products = await models.Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { name, price, description, shortDescription, image, category, available, quantity, warranty, productCode } = req.body;
    const newProduct = new models.Product({ name, price, description, shortDescription, image, category, available, quantity, warranty, productCode });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { name, price, description, shortDescription, image, category, available, quantity, warranty, productCode } = req.body;
    const updatedProduct = await models.Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description, shortDescription, image, category, available, quantity, warranty, productCode },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await models.Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;