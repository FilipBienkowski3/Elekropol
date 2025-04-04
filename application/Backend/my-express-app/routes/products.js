const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../cloudinaryConfig');
const { Product } = require('../db');

const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:productCode', async (req, res) => {
  const { productCode } = req.params;

  try {
    const product = await Product.findOne({ productCode });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post('/:productCode/reviews', async (req, res) => {
  const { productCode } = req.params;
  const { author, comment, rating, date } = req.body;

  console.log('Received request to add review:', { productCode, author, comment, rating, date });

  try {
    const product = await Product.findOne({ productCode });
    console.log('Product found:', product);

    if (!product) {
      console.error('Product not found:', productCode);
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!comment || !rating) {
      console.error('Missing required fields:', { comment, rating });
      return res.status(400).json({ message: 'Missing required fields: comment and rating' });
    }

    const newReview = { author, comment, rating, date };
    product.reviews.push(newReview);

    await product.save();
    console.log('Review added successfully:', newReview);

    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: error.message });
  }
});
router.post('/create', upload.single('image'), async (req, res) => {
  const { name, price, description, shortDescription, category, available, quantity, warranty, productCode } = req.body;

  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const newProduct = new Product({
      name,
      price,
      description,
      shortDescription,
      image: result.secure_url,
      category,
      available,
      quantity,
      warranty,
      productCode
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas dodawania produktu' });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { name, price, description, shortDescription, image, category, available, quantity, warranty, productCode } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
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
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;