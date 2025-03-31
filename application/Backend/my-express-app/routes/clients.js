const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../db');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email i hasło są wymagane' 
      });
    }

    const client = await models.Client.findOne({ email });
    
    if (!client) {
      return res.status(401).json({ 
        success: false, 
        message: 'Nieprawidłowy email lub hasło' 
      });
    }

    if (password !== client.password) {
      return res.status(401).json({ 
        success: false, 
        message: 'Nieprawidłowy email lub hasło' 
      });
    }

    const token = jwt.sign(
      { userId: client._id, email: client.email, type: client.type },
      'secret-key',
      { expiresIn: '1h' }
    );

    const userData = {
      id: client._id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      type: client.type
    };
    
    res.status(200).json({ 
      success: true, 
      message: 'Zalogowano pomyślnie',
      user: userData,
      token: token
    });
    
  } catch (error) {
    console.error('Błąd logowania:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Błąd serwera', 
      error: error.message 
    });
  }
});



router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'Brak tokenu' });
    }
    const decoded = jwt.verify(token, 'secret-key');
    const client = await models.Client.findById(decoded.userId);

    if (!client) {
      return res.status(404).json({ success: false, message: 'Użytkownik nie znaleziony' });
    }

    const userData = {
      id: client._id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      type: client.type
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error('Błąd pobierania danych użytkownika:', error);
    res.status(500).json({ success: false, message: 'Błąd serwera', error: error.message });
  }
});


// http://localhost:3000/clients
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