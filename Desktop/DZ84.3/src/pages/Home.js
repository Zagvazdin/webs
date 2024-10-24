import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext'; // Импортируйте контекст корзины
import './styles.css'; 
import { products } from './products';  // Импортируйте массив продуктов

const Home = () => {
  const [currentProducts, setCurrentProducts] = useState(products.slice(0, 6)); // Текущие продукты
  const { addToCart } = useCart(); // Получите функцию добавления в корзину

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProducts(prevProducts => {
        const newProducts = [...prevProducts];
        const firstProduct = newProducts.shift(); // Убираем первый элемент
        newProducts.push(firstProduct); // Добавляем его в конец
        return newProducts;
      });
    }, 2000); // 2 секунды

    return () => clearInterval(interval); // Очищаем интервал при размонтировании
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product); // Добавление товара в корзину
  };

  return (
    <div>
      <section className="promo">
        <div className="promo__img">
          <img src="statik/images/header__img.svg" alt="фото с моделью" />
        </div>
        <div className="promo__content">
          <div className="promo__info">
            <h1 className="promo__title">THE BRAND</h1>
            <h2 className="promo__heading">OF LUXERIOUS <span style={{ color: '#F16D7F' }}>FASHION</span></h2>
          </div>
        </div>
      </section>

      <section className="sale">
        <div className="sale__item">
          <div className="sale__content">
            <p className="sale__text">30% OFF</p>
            <h3 className="sale__heading">FOR WOMEN</h3>
          </div>
          <img src="statik/images/advertisement001.jpg" alt="sale image" className="img__sale" />
        </div>
        <div className="sale__item">
          <div className="sale__content">
            <p className="sale__text">HOT DEAL</p>
            <h3 className="sale__heading">FOR MEN</h3>
          </div>
          <img src="statik/images/advertisement002.jpg" alt="sale image" className="img__sale" />
        </div>
        <div className="sale__item center">
          <div className="sale__content">
            <p className="sale__text">NEW ARRIVALS</p>
            <h3 className="sale__heading">FOR KIDS</h3>
          </div>
          <img src="statik/images/advertisement003.jpg" alt="sale image" className="img__sale" />
        </div>
        <div className="sale__item sale__item__big">
          <div className="sale__content">
            <p className="sale__text">LUXIROUS & TRENDY</p>
            <h3 className="sale__heading">ACCESORIES</h3>
          </div>
          <img src="statik/images/advertisement004.jpg" alt="sale image" className="img__big" />
        </div>
      </section>

      <section className="product-box">
        <h2 className="product-box__heading">Featured Items</h2>
        <p className="product-box__text">Shop for items based on what we featured in this week</p>
        <div className="product-box__content">
          {currentProducts.map(product => (
            <div className="product center" key={product.id}>
              <div className="product__picturebox">
                <div className="product__picturebox__itemHover">
                  <button 
                    className="product__picturebox__buy-button"
                    onClick={() => handleAddToCart(product)} // Обработчик добавления товара
                  >
                    <img src="statik/images/Vector.svg" alt="корзина" className="product__picturebox__buy-button-img" />
                    Add to Cart
                  </button>
                </div>
                <img src={product.image} alt={product.name} className="product__picturebox__img" />
              </div>
              <div className="product__content center">
                <h5 className="product__content__heading">{product.name}</h5>
                <p className="product__content__text">{product.description}</p>
                <p className="product__content__price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="product-box__button center">
          <button className="product-box__button__text" onClick={() => window.location.href = '/catalog'}>Browse All Products</button>
        </div>
      </section>

      <div className="advantages">
        <article className="advantages__item">
          <img src="statik/images/advantages1.svg" alt="машина" />
          <h3 className="advantages__item__heading">Free Delivery</h3>
          <p className="advantages__item__text">Worldwide delivery on all.Authorit tively morph <br /> next-generation innov tion with extensive models.</p>
        </article>
        <article className="advantages__item">
          <img src="statik/images/advantages2.svg" alt="процент" />
          <h3 className="advantages__item__heading">Sales & discounts</h3>
          <p className="advantages__item__text">Worldwide delivery on all.Authorit tively morph <br /> next-generation innov tion with extensive models.</p>
        </article>
        <article className="advantages__item">
          <img src="statik/images/advantages3.svg" alt="корона" />
          <h3 className="advantages__item__heading">Quality assurance</h3>
          <p className="advantages__item__text">Worldwide delivery on all.Authorit tively morph <br /> next-generation innov tion with extensive models.</p>
        </article>
      </div>
    </div>
  );
};

export default Home;
