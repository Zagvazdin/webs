import React from 'react';
import { Link } from 'react-router-dom'; // Импортируйте Link для навигации
import "./Header.css"

const Header2 = () => {
  return (
    <header className="top-head2">
      <div className="top-head__box">
        <h1>NEW ARRIVALS</h1>
        <nav>
          <ul className="top-head__breadcrumbs">
            <li className="top-head__li"><Link className="top-head__link" to="/">HOME</Link></li>
            <li className="top-head__li"><Link className="top-head__link" to="#">MAN</Link></li>
            <li className="top-head__li"><Link className="top-head__link" to="#">NEW ARRIVALS</Link></li>
          
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;
