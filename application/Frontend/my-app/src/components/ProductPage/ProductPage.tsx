import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductPage.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  productCode: string;
}

const ProductPage: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${productCode}`);
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania produktu');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    fetchProduct();
  }, [productCode]);

  if (!product) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <p>Cena: {product.price} zł</p>
      <p>Kod produktu: {product.productCode}</p>
    </div>
  );
};

export default ProductPage;