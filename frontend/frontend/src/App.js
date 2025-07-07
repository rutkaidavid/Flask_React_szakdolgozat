import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Contact from "./Contact";
import Services from "./Services";
import Admin from "./Admin";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div>
        <h1>KORLEAND</h1>
        <nav>
          <Link to="/">Szolgáltatások</Link> |{" "}
          <Link to="/contact">Kapcsolat</Link> |{" "}
          <Link to="/admin">Admin</Link> |{" "}
          <Link to="/register">Regisztráció</Link> |{" "}
          <Link to="/login">Bejelentkezés</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
