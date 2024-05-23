// src/index.js or src/main.js (depending on your setup)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './Auth/AuthContext';
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MaterialTailwindControllerProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </MaterialTailwindControllerProvider>,
)

