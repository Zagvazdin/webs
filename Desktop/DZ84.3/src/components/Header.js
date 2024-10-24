import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Импортируйте useCart
import "./Header.css";

const Header = () => {
  const { cartItems } = useCart(); // Используйте хук для доступа к cartItems
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Подсчет общего количества товаров

  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="top">
      <header className="header center">
        <div className="header__left">
          <Link to="/"><img src="statik/images/top__menu__logo.svg" alt="логотип" /></Link>
          <Link to="#"><img src="statik/images/top__menu__search.svg" alt="поиск" /></Link>
        </div>
        <nav className="header__right">
          <label htmlFor="header__check" onClick={toggleMenu}>
            <img src="statik/images/top__menu__menu.svg" alt="меню" />
          </label>
          <Link to="/registration" className="header__link-site zoomtrans">
            <img src="statik/images/top__menu__profile.svg" alt="личный профиль" />
          </Link>
          <Link to="/cart" className="header__link-site zoomtrans">
            <img src="statik/images/top__menu__basket.svg" alt="корзина" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>} {/* Отображение количества товаров */}
          </Link>
        </nav>
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <h3 className="mobile-menu__heading">MENU</h3>
          <div className="mobile-menu__box">
            <div className="mobile-menu__item">
                <a href="#" className="mobile-menu__title">MAN</a>
                <ul className="mobile-menu__list">
                    <li><a className="mobile-menu__link" href="#">Accessories</a></li>
                    <li><a className="mobile-menu__link" href="#">Bags</a></li>
                    <li><a className="mobile-menu__link" href="#">Denim</a></li>
                    <li><a className="mobile-menu__link" href="#">T-Shirts</a></li>
                </ul>
            </div>
            <div className="mobile-menu__item">
                <a href="#" className="mobile-menu__title">WOMAN</a>
                <ul className="mobile-menu__list">
                    <li><a className="mobile-menu__link" href="">Accessories</a></li>
                    <li><a className="mobile-menu__link" href="">Jackets & Coats</a></li>
                    <li><a className="mobile-menu__link" href="">Polos</a></li>
                    <li><a className="mobile-menu__link" href="">T-Shirts</a></li>
                    <li><a className="mobile-menu__link" href="">Shirts</a></li>
                </ul>
            </div>
            <div className="mobile-menu__item">
                <a href="#" className="mobile-menu__title">KIDS</a>
                <ul className="mobile-menu__list">
                    <li><a className="mobile-menu__link" href="">Accessories</a></li>
                    <li><a className="mobile-menu__link" href="">Jackets & Coats</a></li>
                    <li><a className="mobile-menu__link" href="">Polos</a></li>
                    <li><a className="mobile-menu__link" href="">T-Shirts</a></li>
                    <li><a className="mobile-menu__link" href="">Shirts</a></li>
                    <li><a className="mobile-menu__link" href="">Bags</a></li>
                </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
