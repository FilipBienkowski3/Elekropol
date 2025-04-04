import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();
  const { cart, setCart, theme } = useContext(UserContext)!;

  const carouselImages = [carousel1, carousel2];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) throw new Error('Błąd podczas pobierania produktów');
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

  const handleProductClick = (productCode: string) => navigate(`/product/${productCode}`);

  const handleAddToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.productCode === product.productCode);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.productCode === product.productCode
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, {
        productCode: product.productCode,
        name: product.name,
        price: product.price,
        quantity: 1,
        maxQuantity: 10,
        image: product.image,
      }];
    }

    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 1000);
  };

  return (
    <div className={`home-container ${theme}`}>
      {showSuccessPopup && <div className="success-popup">Produkt dodany do koszyka!</div>}
      <div className="home-carousel">
        <img src={carouselImages[currentImageIndex]} alt="Carousel" className="home-carousel-image" />
      </div>
      <div className="home-featured-section">
        <h2>Polecane</h2>
        <div className="home-product-grid">
          {products.map((product) => (
            <div key={product._id} className="home-product-card" onClick={() => handleProductClick(product.productCode)}>
              <img src={product.image} alt={product.name} className="home-product-image" />
              <div className="home-product-info">
                <div className="home-product-info-text">
                  <h3>{product.name}</h3>
                  <p>{product.price} zł</p>
                </div>
                <button className="home-add-button" onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;