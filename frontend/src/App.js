import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Products from "./Components/Products";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          // Render these routes when the user is not authenticated
          <>
            <Route exact path="/login" element={<Login />} />
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
