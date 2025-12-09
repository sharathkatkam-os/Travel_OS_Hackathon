import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { TravelProvider } from './context/TravelContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TravelProvider>
      <App />
    </TravelProvider>
  </StrictMode>
);
