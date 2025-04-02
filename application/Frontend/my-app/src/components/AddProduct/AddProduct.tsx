import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './AddProduct.css';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    shortDescription: '',
    image: null as File | null,
    category: '',
    available: true,
    quantity: 0,
    warranty: '',
    productCode: ''
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.gif']
    },
    onDrop: (acceptedFiles) => {
      setFormData({
        ...formData,
        image: acceptedFiles[0]
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price.toString());
    data.append('description', formData.description);
    data.append('shortDescription', formData.shortDescription);
    data.append('category', formData.category);
    data.append('available', formData.available.toString());
    data.append('quantity', formData.quantity.toString());
    data.append('warranty', formData.warranty);
    data.append('productCode', formData.productCode);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await fetch('http://localhost:3000/products/create', {
        method: 'POST',
        body: data
      });

      if (!response.ok) {
        throw new Error('Błąd podczas dodawania produktu');
      }

      setFormData({
        name: '',
        price: 0,
        description: '',
        shortDescription: '',
        image: null,
        category: '',
        available: true,
        quantity: 0,
        warranty: '',
        productCode: ''
      });

      alert('Produkt został dodany pomyślnie!');
    } catch (error) {
      console.error('Błąd:', error);
      alert('Wystąpił błąd podczas dodawania produktu');
    }
  };

  return (
    <div className="add-product-container">
      <h1>Dodaj nowy produkt</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nazwa produktu:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Cena:</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Opis:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Krótki opis:</label>
          <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Zdjęcie:</label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {formData.image ? (
              <p>Wybrane zdjęcie: {formData.image.name}</p>
            ) : (
              <p>Przeciągnij i upuść zdjęcie tutaj lub kliknij, aby wybrać plik.</p>
            )}
          </div>
        </div>
        <div className="form-group">
          <label>Kategoria:</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Dostępność:</label>
          <select name="available" value={formData.available.toString()} onChange={handleChange} required>
            <option value="true">Dostępny</option>
            <option value="false">Niedostępny</option>
          </select>
        </div>
        <div className="form-group">
          <label>Ilość:</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Gwarancja:</label>
          <input type="text" name="warranty" value={formData.warranty} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Kod produktu:</label>
          <input type="text" name="productCode" value={formData.productCode} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-button">Dodaj produkt</button>
      </form>
    </div>
  );
};

export default AddProduct;