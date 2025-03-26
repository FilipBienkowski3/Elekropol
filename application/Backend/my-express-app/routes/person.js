var express = require('express');
var router = express.Router();
var models = require('../db');

router.get('/', async (req, res) => {
  try {
    const persons = await models.Person.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/create', async (req, res) => {
  try {
    const { id, name, surname, job } = req.body;
    const newPerson = new models.Person({ id, name, surname, job });
    const savedPerson = await newPerson.save();
    res.status(201).json(savedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const { name, surname, job } = req.body;
    const updatedPerson = await models.Person.findOneAndUpdate(
      { id: req.params.id },
      { name, surname, job },
      { new: true }
    );

    if (!updatedPerson) {
      return res.status(404).json({ message: 'Person not found' });
    }

    res.json(updatedPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await models.Person.deleteOne({ id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
