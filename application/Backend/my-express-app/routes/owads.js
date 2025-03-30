const express = require('express');
const router = express.Router();
const { Owad } = require('../db');
//http://localhost:3000/owads
router.get('/', async (req, res) => {
  try {
    const owady = await Owad.find();
    res.json(owady);
  } catch (err) {
    res.status(500).json({ message: 'Błąd serwera', error: err });
  }
});

module.exports = router;