import React from 'react';
import "./Footer.css"

const Subscription = () => {
  return (
    <div className="subscription">
      <figure className="subscription__staff">
        <img src="statik/images/face.svg" alt="лицо" />
        <p className="subscription__staff__figure-text">
          “Vestibulum quis porttitor dui! Quisque<br />
          <em>viverra nunc mi, a pulvinar purus condimentum“</em>
        </p>
      </figure>
      <div className="subscription__input-email">
        <p className="subscription__input-email__text">
          <span className="subscription__input-email__title">SUBSCRIBE</span><br />
          FOR OUR NEWSLETTER AND PROMOTION
        </p>
        <div className="subscription__input-email__submit">
          <input
            className="subscription__input-email__submit__subscribe"
            type="email"
            required
            placeholder="Enter Your Email"
          />
          <input
            className="subscription__input-email__submit__btn"
            type="submit"
            value="Subscribe"
          />
        </div>
      </div>
    </div>   

  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2023 Brand All Rights Reserved.</p>
      <div className="footer__items">
        <a className="footer__items__item" href="#"><img src="statik/images/facebook.svg" alt="facebook" /></a>
        <a className="footer__items__item" href="#"><img src="statik/images/instagram.svg" alt="instagram" /></a>
        <a className="footer__items__item" href="#"><img src="statik/images/facebook.svg" alt="facebook" /></a>
        <a className="footer__items__item" href="#"><img src="statik/images/pi.svg" alt="facebook" /></a>
      </div>
    </footer>
  );
};

const App = () => {
  return (
    <div>
      <Subscription />
      <Footer />
    </div>
  );
};

export default App;
