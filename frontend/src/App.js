import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Products from "./Components/Products";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setAuthenticated(!!token); // Set to true if token exists, false otherwise
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          // Render these routes when the user is not authenticated
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : (
          // Render these routes when the user is authenticated
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
