import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import './ProductPage.css';

interface ProductDetails {
  _id: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  available: boolean;
  quantity: number;
  warranty: string;
  productCode: string;
  reviews: Review[];
}

interface Review {
  author: string;
  comment: string;
  rating: number;
  date: string;
}

const ProductPage: React.FC = () => {
  const { productCode } = useParams<{ productCode: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [newOpinion, setNewOpinion] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [quantity, setQuantity] = useState<number>(1);
  const { user, cart, setCart } = useContext(UserContext)!;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/products/${productCode}`);
        const productData = await response.json();
        
        if (productData) {
          setProduct(productData);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productCode) {
      fetchProductDetails();
    }
  }, [productCode]);

  const handleAddToCart = () => {
    if (!product) return;

    const existingItem = cart.find((item) => item.productCode === product.productCode);

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.quantity) {
        return;
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productCode === product.productCode
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      if (quantity > product.quantity) {
        return;
      }
      setCart((prevCart) => [
        ...prevCart,
        {
          productCode: product.productCode,
          name: product.name,
          price: product.price,
          quantity,
          maxQuantity: product.quantity,
          image: product.image,
        },
      ]);
    }
    setShowSuccessPopup(true);
    setTimeout(() => setShowSuccessPopup(false), 1000);
  };

  const handleOpinionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newOpinion.trim()) {
      const author = user ? `${user.firstName} ${user.lastName}` : 'Gość';
      const newReview = {
        author,
        comment: newOpinion,
        rating: rating,
        date: new Date().toISOString(),
      };

      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/products/${productCode}/reviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(newReview),
        });

        if (response.ok) {
          setNewOpinion('');
          setRating(5);
          const updatedProduct = await response.json();
          setProduct(updatedProduct);
        } else {
          const errorData = await response.json();
          console.error('Error submitting review:', errorData.message);
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  };

  if (loading) {
    return <div className="loading">Ładowanie...</div>;
  }

  if (!product) {
    return <div className="error">Produkt nie został znaleziony</div>;
  }

  return (
    <div className="product-page-container">
      {showSuccessPopup && (
        <div className="success-popup">
          Produkt dodany do koszyka!
        </div>
      )}
      <div className="product-main">
        <div className="product-gallery">
          <div className="product-main-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-thumbnails">
            <div className="thumbnail active">
              <img src={product.image} alt={product.name} />
            </div>
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">{product.price} PLN</div>

          <div className="product-description">
            <h2>Opis produktu</h2>
            <p>{product.description}</p>
          </div>

          <div className="add-to-cart-section">
            <label htmlFor="quantity">Ilość:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              max={product.quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(product.quantity, Number(e.target.value))))}
              className="quantity-input"
            />
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Dodaj do koszyka
            </button>
          </div>

          <div className="product-tabs">
            <div className="tab-section">
              <h2>OPINIE O PRODUKCIE</h2>
              <div className="opinions-list">
                {product.reviews.map((review, index) => (
                  <div key={index} className="opinion-item">
                    <div className="opinion-author">{review.author}</div>
                    <div className="opinion-content">{review.comment}</div>
                    <div className="opinion-rating">Ocena: {review.rating}/5</div>
                    <div className="opinion-date">{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="tab-section">
              <h2>DODAJ OPINIĘ</h2>
              <div className="add-opinion">
                <form onSubmit={handleOpinionSubmit}>
                  <textarea
                    placeholder="Dodaj opinię..."
                    value={newOpinion}
                    onChange={(e) => setNewOpinion(e.target.value)}
                  />
                  <div className="rating-select">
                    <label htmlFor="rating">Ocena:</label>
                    <select
                      id="rating"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <button type="submit" className="add-opinion-button">Dodaj opinię</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;