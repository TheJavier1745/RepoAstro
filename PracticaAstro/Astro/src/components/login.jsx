import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const correo = event.target.correo.value.trim();
    const contrasena = event.target.contrasena.value.trim();

    // Validar que los campos no estén vacíos
    if (!correo || !contrasena) {
      setAlerta({ tipo: "error", mensaje: "Todos los campos son obligatorios." });
      return;
    }

    setLoading(true); // Mostrar indicador de carga

    try {
      const response = await fetch("http://localhost:5079/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      // Si la respuesta es exitosa
      if (response.ok) {
        setAlerta({ tipo: "success", mensaje: "Inicio de sesión exitoso." });

        // Almacenar el token en el localStorage
        if (data.Token) {
          localStorage.setItem("token", data.Token);
        }

        // Redirigir según el tipo de usuario
        if (data.tipoUsuario === "admin") {
          window.location.href = "/admin";
        } else if (data.tipoUsuario === "usuario") {
          window.location.href = "/";
        } else {
          setAlerta({ tipo: "error", mensaje: "Tipo de usuario desconocido." });
        }
      } else {
        // Mostrar mensaje de error devuelto por el backend
        setAlerta({ tipo: "error", mensaje: data.Message || "Correo o contraseña inválidos." });
      }
    } catch (error) {
      // Manejar errores de conexión
      setAlerta({ tipo: "error", mensaje: "No se pudo conectar con el servidor." });
    } finally {
      setLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <div className="contact-form">
      <h2 className="section-title">Inicio de sesión</h2>
      <p>Inicia sesión para acceder a tu cuenta.</p>

      {/* Mostrar alertas */}
      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input type="email" id="correo" name="correo" placeholder="Correo Electrónico" required />
        </div>

        <div className="form-group">
          <input type="password" id="contrasena" name="contrasena" placeholder="Contraseña" required />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Ingresar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
