import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from '@mui/icons-material/Send';

const Login = () => {
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correo = event.target.correo.value.trim();
    const contrasena = event.target.contrasena.value.trim();

    if (!correo || !contrasena) {
      setAlerta({ tipo: "error", mensaje: "Todos los campos son obligatorios." });
      return;
    }

    try {
      const response = await fetch("http://localhost:5079/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        if (data.tipoUsuario === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      } else {
        setAlerta({ tipo: "error", mensaje: data.Message || "Correo o contraseña inválidos." });
      }
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "No se pudo conectar con el servidor." });
    }
  };

  return (
    <div className="contact-form">
      <h2 className="section-title">Inicio de sesión</h2>
      <p>Inicia sesión para acceder a tu cuenta.</p>

      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input type="email" id="correo" name="correo" placeholder="Correo Electrónico" required />
        </div>

        <div className="form-group">
          <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required />
        </div>

        <Button variant="contained" type="submit" className="btn-primary" disabled={loading} startIcon={!loading && <LoginIcon />}>
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Ingresar"}
        </Button>
      </form>

      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <Link to="/forgot-password" style={{ textDecoration: "none", color: "#007bff" }}>
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
    </div>
  );
};

export default Login;
