import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login.jsx";
import ForgotPassword from "../components/forgotpass.jsx"; 
import ResetPasswordForm from "../components/resetpass.jsx";
import FormularioAgregarAdmin from "../components/formularioAgregarAdmin.jsx";  
import TablaAdmin from "../components/TablaAdministracionUsuarios.jsx";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} /> {/* Ruta para restablecer la contraseña */}
        <Route path="/agregarUsuario" element={<FormularioAgregarAdmin />} />
        <Route path="/administrarUsuarios" element={<TablaAdmin />} />

      </Routes>
    </Router>
  );
};

export default App;
