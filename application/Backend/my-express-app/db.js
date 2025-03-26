const mongoose = require('mongoose');
 
 const dbUrl = 'mongodb+srv://fbienkowski:tIk6IQL9ovU8dLxI@cluster0.dgnyu.mongodb.net/myapp?retryWrites=true&w=majority';
 
 mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
     console.log("Connected to MongoDB successfully.");
   })
   .catch((error) => {
     console.error("Error connecting to MongoDB:", error);
   });
 
 const personSchema = new mongoose.Schema({
   id: { type: Number, required: true },
   name: { type: String, required: true },
   surname: { type: String, required: true },
   job: { type: String, required: true }
 });
 
 const Person = mongoose.model('Person', personSchema);
 
 module.exports = { Person };