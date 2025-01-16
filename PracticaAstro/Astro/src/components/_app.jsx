import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login.jsx";
import ForgotPassword from "../components/forgotpass.jsx"; 
import ResetPasswordForm from "../components/resetpass.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} /> {/* Ruta para restablecer la contraseña */}
      </Routes>
    </Router>
  );
};

export default App;
