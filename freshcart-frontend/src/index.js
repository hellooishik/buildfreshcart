import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// ✅ Move Bootstrap import to the top
import "bootstrap/dist/css/bootstrap.min.css"; 

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);
