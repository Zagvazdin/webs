import React from 'react';
import { products } from './products.js'; // Импортируйте товары
import "./Product.css"
const ProductPage = () => {
    return (
        <div>
            <header className="top-head">
                <div className="top-head__box">
                    <h1>NEW ARRIVALS</h1>
                    <nav>
                        <ul className="top-head__breadcrumbs">
                            <li className="top-head__li"><a className="top-head__link" href="index.html">HOME</a></li>
                            <li className="top-head__li"><a className="top-head__link" href="#">MAN</a></li>
                            <li className="top-head__li"><a className="top-head__link" href="#">NEW ARRIVALS</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main className="main-product">
                <div className="main-product__img">
                    <div className="main-product__img__img"><img src="statik/images/main-product.jpg" alt="product" /></div>
                </div>

                <section className="main-product__center center">
                    <div className="main-product__info">
                        <h4>WOMEN COLLECTION</h4>
                        <h2>MOSCHINO CHEAP AND CHIC</h2>
                        <p className="main-product__info__text">Compellingly actualize fully researched processes before proactive outsourcing.</p>
                        <p className="main-product__info__price">$561</p>
                        <div className="main-product__info__features">
                            <button className="main-product__info__klick">CHOOSE COLOR</button>
                            <button className="main-product__info__klick">CHOOSE SIZE</button>
                            <button className="main-product__info__klick">QUANTITY</button>
                        </div>
                        <button className="main-product__info__button" onClick={() => window.location.href='cart.html'}>
                            Add to Cart
                        </button>
                    </div>
                </section>

                <section className="main-product__bottom center">
                    {products.slice(0, 3).map((product, index) => (
                        <div key={index} className="product-item">
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <p className="product__content__text">{product.description}</p>
                            <p className="product__content__price">${product.price.toFixed(2)}</p>
                            <button onClick={() => window.location.href='cart.html'}>Add to Cart</button>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default ProductPage;
