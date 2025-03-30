const express = require('express');
const router = express.Router();
const models = require('../db');

router.get('/', async (req, res) => {
  try {
    const clients = await models.Client.find({});
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { firstName, lastName, email, password, type, address } = req.body;
    const newClient = new models.Client({ firstName, lastName, email, password, type, address });
    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { firstName, lastName, email, password, type, address } = req.body;
    const updatedClient = await models.Client.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, password, type, address },
      { new: true }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(updatedClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await models.Client.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;