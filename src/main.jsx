import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/normalize.css';
import AppRouter from './router/AppRouter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
