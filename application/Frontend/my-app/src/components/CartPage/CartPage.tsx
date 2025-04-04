import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import './CartPage.css';

const CartPage: React.FC = () => {
  const { cart, setCart } = useContext(UserContext)!;
  const navigate = useNavigate();

  const handleQuantityChange = (productCode: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.productCode === productCode
          ? { ...item, quantity: Math.min(newQuantity, item.maxQuantity) }
          : item
      )
    );
  };

  const handleRemoveItem = (productCode: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.productCode !== productCode));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page-container">
      <h1>Koszyk</h1>
      {cart.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.productCode} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-info">
                  <h2>{item.name}</h2>
                  <p>Cena: {item.price} PLN</p>
                  <div className="item-quantity">
                    <label htmlFor={`quantity-${item.productCode}`}>Ilość:</label>
                    <input
                      type="number"
                      id={`quantity-${item.productCode}`}
                      value={item.quantity}
                      min="1"
                      max={item.maxQuantity}
                      onChange={(e) => handleQuantityChange(item.productCode, Number(e.target.value))}
                    />
                    <button onClick={() => handleRemoveItem(item.productCode)}>Usuń</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="discount-code">
              <h2>Kod rabatowy</h2>
              <input type="text" placeholder="Wpisz kod rabatowy..." />
              <button>Dodaj kod</button>
            </div>
            <div className="summary-details">
              <h2>Podsumowanie</h2>
              <p>Łączna cena: {totalPrice} PLN</p>
              <button onClick={() => navigate('/checkout')}>Kontynuuj</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;