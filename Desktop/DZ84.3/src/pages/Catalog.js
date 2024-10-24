// Catalog.js
import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { products } from './products'; // Импортируйте массив продуктов
import "./Catalog.css";
import Header2 from "../components/Header2";

const Catalog = () => {
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { addToCart } = useCart();

  const handleSizeChange = (size) => {
    setSelectedSizes(prevSizes =>
      prevSizes.includes(size) ? prevSizes.filter(s => s !== size) : [...prevSizes, size]
    );
  };

  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };

  return (
    <div>
      <Header2 />
      <div className="filter-sort">
        <details className="filter">
          <summary className="filter__summary">
            <span className="filter__heading">FILTER</span>
          </summary>
          <div className="filter__content">
            <details className="filter__item">
              <summary className="filter__head">CATEGORY</summary>
              <div className="filter__link-box">
              <a href="#" className="filter__link">Accessories</a>
                <a href="#" className="filter__link">Bags</a>
                <a href="#" className="filter__link">Denim</a>
                <a href="#" className="filter__link">Hoodies & Sweatshirts</a>
                <a href="#" className="filter__link">Jackets & Coats</a>
                <a href="#" className="filter__link">Polos</a>
                <a href="#" className="filter__link">Shirts</a>
                <a href="#" className="filter__link">Shoes</a>
                <a href="#" className="filter__link">Sweaters & Knits</a>
                <a href="#" className="filter__link">T-Shirts</a>
                <a href="#" className="filter__link">Tanks</a>
              </div>              
            </details>
            <details className="filter__item">
              <summary className="filter__head">BRAND</summary>
              <div className="filter__link-box">
              <a href="#" className="filter__link">Brand 1</a>
                <a href="#" className="filter__link">Brand 2</a>
                <a href="#" className="filter__link">Brand 3</a>
              </div>
            </details>
            <details className="filter__item">
              <summary className="filter__head">DESIGNER</summary>
              <div className="filter__link-box">
              <a href="#" className="filter__link">Designer 1</a>
                <a href="#" className="filter__link">Designer 2</a>
                <a href="#" className="filter__link">Designer 3</a>
              </div>
            </details>
          </div>
        </details>
        <div className="sort">
          <details className="sort__details">
            <summary className="sort__summary">
              <span className="sort__heading">TRENDING NOW</span>
              <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" fill="#6F6E6E" />
              </svg>
            </summary>
          </details>
        </div>

        <div className="sort">
          <details className="sort__details">
            <summary className="sort__summary">
              <span className="sort__heading">SIZE</span>
              <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" fill="#6F6E6E" />
              </svg>
            </summary>
            <div className="sort__box">
              {["XS", "S", "M", "L"].map(size => (
                <div className="sort__check" key={size}>
                  <input
                    id={`sort__check${size}`}
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                  />
                  <label htmlFor={`sort__check${size}`}>{size}</label>
                </div>
              ))}
            </div>
          </details>

          <details className="sort__details">
            <summary className="sort__summary">
              <span className="sort__heading">PRICE</span>
              <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.00214 5.00214C4.83521 5.00247 4.67343 4.94433 4.54488 4.83782L0.258102 1.2655C0.112196 1.14422 0.0204417 0.969958 0.00302325 0.781035C-0.0143952 0.592112 0.0439493 0.404007 0.165221 0.258101C0.286493 0.112196 0.460759 0.0204417 0.649682 0.00302327C0.838605 -0.0143952 1.02671 0.043949 1.17262 0.165221L5.00214 3.36602L8.83167 0.279536C8.90475 0.220188 8.98884 0.175869 9.0791 0.149125C9.16937 0.122382 9.26403 0.113741 9.35764 0.1237C9.45126 0.133659 9.54198 0.162021 9.6246 0.207156C9.70722 0.252292 9.7801 0.313311 9.83906 0.386705C9.90449 0.460167 9.95405 0.546351 9.98462 0.639855C10.0152 0.733359 10.0261 0.83217 10.0167 0.930097C10.0073 1.02802 9.97784 1.12296 9.93005 1.20895C9.88227 1.29494 9.81723 1.37013 9.73904 1.42982L5.45225 4.88068C5.32002 4.97036 5.16154 5.01312 5.00214 5.00214Z" fill="#6F6E6E" />
              </svg>
            </summary>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
              placeholder="Min Price"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
              placeholder="Max Price"
            />
          </details>
        </div>
      </div>

      <main className="main-product">
        <section className="main-product__bottom main-product__bottom_catalog center">
          <div className="main-product__bottom__items">
            {products
              .filter(product => 
                selectedSizes.length === 0 || selectedSizes.includes(product.size)
              )
              .filter(product => 
                product.price >= priceRange[0] && product.price <= priceRange[1]
              )
              .map(product => (
                <div className="product" key={product.id}>
                  <div className="product__picturebox">
                    <div className="product__picturebox__itemHover">
                      <a
                        href="#"
                        className="product__picturebox__buy-button"
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        <img
                          src="statik/images/Vector.svg"
                          alt="корзина"
                          className="product__picturebox__buy-button-img"
                        />
                        Добавить в корзину
                      </a>
                    </div>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="product__picturebox__img"
                    />
                  </div>
                  <div className="product__content">
                    <h5 className="product__content__heading">{product.name}</h5>
                    <p className="product__content__text">{product.description}</p>
                    <p className="product__content__price">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Catalog;
