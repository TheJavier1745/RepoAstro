import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/formulario.css"; // Ruta relativa al archivo CSS

const Login = () => {
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(false);

  const validarCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo) && correo.split("@")[0].length > 2;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const correo = event.target.correo.value.trim();
    const contrasena = event.target.contrasena.value.trim();
  

    // Validar campos vacíos
    if (!correo || !contrasena) {
      setAlerta({ tipo: "error", mensaje: "Todos los campos son obligatorios." });
      return;
    }

    // Validar correo
    if (!validarCorreo(correo)) {
      setAlerta({ tipo: "error", mensaje: "El correo ingresado no es válido." });
      return;
    }

    setLoading(true); // Mostrar indicador de carga

    try {
      const response = await fetch("http://localhost:5079/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena}),
      });

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);
      if (response.ok) {
        // Verificar si la respuesta contiene el tipo de usuario
        if (data.tipoUsuario) {
          setAlerta({ tipo: "success", mensaje: data.success || "Inicio de sesión exitoso." });

          if (data.tipoUsuario === "admin") {
            window.location.href = "/admin"; // Redirigir al panel de administrador
          } else if (data.tipoUsuario === "usuario") {
            window.location.href = "/"; // Redirigir a la página principal
          } else {
            setAlerta({ tipo: "error", mensaje: "Tipo de usuario desconocido." });
          }
        } else {
          setAlerta({ tipo: "error", mensaje: "Datos de usuario inválidos." });
        }
      } else {
        setAlerta({ tipo: "error", mensaje: data.error || "Correo o contraseña inválidos." });
      }
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensaje: "No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false); // Ocultar indicador de carga
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
          <span className="material-icons">email</span>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Correo Electrónico"
            required
          />
        </div>

        <div className="form-group">
          <span className="material-icons">lock</span>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            placeholder="Clave"
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <CircularProgress size={24} style={{ color: "white" }} />
          ) : (
            <>
              <span className="material-icons">login</span> Ingresar
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
