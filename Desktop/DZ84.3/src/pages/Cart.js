import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext'; // Убедитесь, что этот контекст правильно настроен
import { useNavigate } from 'react-router-dom'; // Импортируйте useNavigate
import './Cart.css';

const Cart = () => {
  const { cartItems, setCartItems, removeFromCart, clearCart, updateCartItemQuantity } = useCart();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // Инициализация navigate

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Не допускаем количества меньше 1
    updateCartItemQuantity(id, quantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id); // Удаление товара из корзины
  };

  const calculateDiscount = (total) => {
    if (total >= 1200) return total * 0.15;
    if (total >= 800) return total * 0.10;
    if (total >= 400) return total * 0.05;
    return 0;
  };

  const discount = calculateDiscount(totalPrice);
  const finalPrice = totalPrice - discount;

  return (
    <div className="cart">
      <header className="top-head center">
        <div className="top-head__box">
          <h1>SHOPPING CART</h1>
        </div>
      </header>

      <div className="product-selection center">
        <div className="product-selection__cards">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="product-selection__card" key={item.id}>
                <div className="product-selection__card-first">
                  <img src={item.image} alt="Изображение товара" />
                  <div className="product-selection__card-info">
                    <div className="product-selection__header">
                      <h2 className="product-selection__title">{item.name}</h2>
                    </div>
                    <p className="product-selection__price">Price: ${item.price.toFixed(2)}</p>
                    <p className="product-selection__color">Color: {item.color}</p>
                    <p className="product-selection__size">Size: {item.size}</p>
                    <div className="product-selection__input">
                      <p>Quantity:</p>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                    </div>
                    <p className="product-selection__total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Корзина пуста</p>
          )}
          <div className="product-selection__buttons">
            <button className="product-selection__button" onClick={clearCart}>CLEAR SHOPPING CART</button>
            <button className="product-selection__button" onClick={() => navigate('/catalog')}>CONTINUE SHOPPING</button>
          </div>
        </div>

        <div className="product-selection__info">
          <div className="product-selection__info__address">
            <h5 className="product-selection__info__address-title">SHIPPING ADDRESS</h5>
            <input className="product-selection__info__address-input" type="text" placeholder="City" />
            <input className="product-selection__info__address-input" type="text" placeholder="State" />
            <input className="product-selection__info__address-input" type="number" placeholder="Postcode / Zip" />
            <input className="product-selection__info__address-submit" type="submit" value="GET A QUOTE" />
          </div>
          <div className="product-selection__purchase">
            <p className="product-selection__purchase__price-first">SUB TOTAL: ${totalPrice.toFixed(2)}</p>
            <p className="product-selection__purchase__discount">DISCOUNT: ${discount.toFixed(2)}</p>
            <p className="product-selection__purchase__final">FINAL TOTAL: ${finalPrice.toFixed(2)}</p>
            <div className="product-selection__purchase__line"></div>
            <button className="product-selection__purchase__button" onClick={() => navigate('/registration')}>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
