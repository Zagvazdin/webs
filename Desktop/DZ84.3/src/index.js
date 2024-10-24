import React from 'react';
import { createRoot } from 'react-dom/client';  // Импортируем createRoot
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const container = document.getElementById('root'); // Получаем контейнер
const root = createRoot(container); // Создаем корень
root.render(
  <Router>
    <App />
  </Router>
);
