import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // 🚀 Fetch user from API
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoggedInHomePage from "./pages/LoggedInHomePage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Loading state

  useEffect(() => {
    // 🔥 Fetch user authentication from backend
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true }) // Include cookies
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user); // ✅ Set user if authenticated
        }
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null); // Ensure the user is not set if there's an error
      })
      .finally(() => setLoading(false)); // ✅ Stop loading after fetching
  }, []);

  if (loading) return <div>Loading...</div>; // ✅ Prevent incorrect first render

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <LoggedInHomePage user={user} /> : <Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
