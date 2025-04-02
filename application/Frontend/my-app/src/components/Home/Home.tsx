import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

import carousel1 from '../../photos/carousel1.jpg';
import carousel2 from '../../photos/carousel2.jpg';

interface Product {
  _id: string;
  name: string;
  price: number;
  productCode: string;
  image: string;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const carouselImages = [carousel1, carousel2];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Błąd podczas pobierania produktów');
        }
        const data = await response.json();
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 5);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Błąd:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleProductClick = (productCode: string) => {
    navigate(`/product/${productCode}`);
  };

  return (
    <div className="home-container">
      <div className="home-carousel">
        <img
          src={carouselImages[currentImageIndex]}
          alt="Carousel"
          className="home-carousel-image"
        />
      </div>

      <div className="home-featured-section">
        <h2>Polecane</h2>
        <div className="home-product-grid">
          {products.map((product) => (
            <div 
              key={product._id} 
              className="home-product-card" 
              onClick={() => handleProductClick(product.productCode)}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="home-product-image" 
              />
              <div className="home-product-info">
                <div className="home-product-info-text">
                  <h3>{product.name}</h3>
                  <p>{product.price} zł</p>
                </div>
                <button className="home-add-button">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;