import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './DeleteProduct.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  productCode: string; 
  image: string;
}

const DeleteProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania produktów');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/products/delete/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Błąd z backendu:', errorData);
        throw new Error('Błąd podczas usuwania produktu');
      }

      setProducts(products.filter((product) => product._id !== productId));
      alert('Produkt został usunięty pomyślnie');
    } catch (error) {
      console.error('Błąd:', error);
      alert('Wystąpił błąd podczas usuwania produktu');
    }
  };

  return (
    <div className="delete-product-container">
      <h1>Usuń produkt</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-info">
              <h2>{product.name}</h2>
              <p>Cena: {product.price} zł</p>
              <p>Kod produktu: {product.productCode}</p>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
              </div>
            </div>
            <button
              className="delete-button"
              onClick={() => handleDeleteProduct(product._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;