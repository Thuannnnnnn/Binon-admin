// src/index.js or src/main.js (depending on your setup)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Auth/AuthContext';
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

ReactDOM.render(
  <MaterialTailwindControllerProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </MaterialTailwindControllerProvider>,
  document.getElementById('root')
);
