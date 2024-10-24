import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Registration from './pages/Registration';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './CartContext'; // Импортируйте CartProvider

const App = () => {
  return (
    <CartProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
        <Footer />
      </>
    </CartProvider>
  );
};

export default App;
