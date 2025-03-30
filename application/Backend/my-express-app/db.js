// const dbUrl = 'mongodb+srv://fbienkowski:tIk6IQL9ovU8dLxI@cluster0.dgnyu.mongodb.net/myapp?retryWrites=true&w=majority';
const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://fbienkowski:SObGdlyCPcANlyWY@elektropol.atnjp.mongodb.net/elektropol';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  quantity: { type: Number, default: 0 },
  addedDate: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  warranty: { type: String, required: true },
  productCode: { type: String, required: true, unique: true },
  reviews: [{
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }]
});

const clientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }, 
  email: { type: String, required: true, unique: true }, 
  password: { type: String, required: true },
  type: { type: String, enum: ['client', 'manager'], default: 'client' },
  registrationDate: { type: Date, default: Date.now },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  orders: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now }
  }]
});



//tworzenie nowego produktu
const Product = mongoose.model('Product', productSchema);


// const newProduct1 = new Product({
//   name: "Laptop ABC",
//   price: 3499.99,
//   description: "Powerful laptop with a 15.6-inch display, 16 GB RAM, and 512 GB SSD.",
//   shortDescription: "High-performance laptop for professionals.",
//   image: "https://example.com/images/laptop-abc.jpg",
//   category: "electronics",
//   available: true,
//   quantity: 20,
//   warranty: "3 years",
//   productCode: "LAP12345" // Unikalny kod produktu
// });

// newProduct1.save()
//   .then(() => console.log('Product 1 added successfully!'))
//   .catch((err) => console.error('Error adding product 1:', err));

// przykład dodanie klienta
const Client = mongoose.model('Client', clientSchema);

// const newClient1 = new Client({
//   firstName: "Anna",
//   lastName: "Nowak",
//   email: "anna.nowak@example.com",
//   password: "securepassword123",
//   type: "client",
//   address: {
//     street: "456 Oak St",
//     city: "Kraków",
//     postalCode: "30-001",
//     country: "Poland"
//   }
// });

// newClient1.save()
//   .then(() => console.log('Client 1 added successfully!'))
//   .catch((err) => console.error('Error adding client 1:', err));





const zwierzeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});


const Zwierze = mongoose.model('Zwierze', zwierzeSchema, 'zwierzetaaaa'); //3 ARGUMENT TwORZY NAZWE KOLEKCJI, kolekcja powstaje po wylaczeniu wlaczeniu bazy

// Przykład dodania zwierzęcia
// const newZwierze = new Zwierze({
//   name: "Burek",
//   type: "Pies"
// });

// newZwierze.save()
//   .then(() => console.log('Zwierzę dodane pomyślnie!'))
//   .catch((err) => console.error('Błąd podczas dodawania zwierzęcia:', err));

  //




//MOZNA DODAC KATALOG OWADS bez definiowania routes itp, samo to pozwala zrobić katlaog i dodac w bazie, tylko baze disconnect i ponzeje connect

const owadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});


const Owad = mongoose.model('Owad', owadSchema,); // jak nie dam argumentu to bedzie owads, w angielskiej werski chyba robi z person people np


// const newowad = new Owad({
//   name: "Bureeek",
//   type: "Piessss"
// });

// newowad.save()
//   .then(() => console.log('Zwierzę dodane pomyślnie!'))
//   .catch((err) => console.error('Błąd podczas dodawania zwierzęcia:', err));


module.exports = { Product, Client, Zwierze,Owad };