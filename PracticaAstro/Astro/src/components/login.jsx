import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "../styles/Formulario.css"; // Ruta relativa al archivo CSS

const Login = () => {
  const [alerta, setAlerta] = useState(null);

  const validarCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo) && correo.split("@")[0].length > 2;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const correo = formData.get("correo").trim();
    const clave = formData.get("clave").trim();
    // Validar campos vacíos
    if (!correo || !clave) {
      setAlerta({ tipo: "error", mensaje: "Todos los campos son obligatorios." });
      scrollToAlert();
      return;
    }

    // Validar correo
    if (!validarCorreo(correo)) {
      setAlerta({ tipo: "error", mensaje: "El correo ingresado no es válido." });
      scrollToAlert();
      return;
    }
    try {
        const response = await fetch("http://localhost/src/utilitarios/login.php", {
          method: "POST",
          body: formData,
        });
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
          throw new Error("Error en la conexión con el servidor.");
        }
        const data = await response.json();
        if (data.success) {
          // Verificar el tipo de usuario desde la respuesta del servidor
          if (data.tipoUsuario === "admin") {
            window.location.href = "/admin"; // Redirige al panel de administrador
          } else if (data.tipoUsuario === "usuario") {
            window.location.href = "/"; // Redirige a la página principal
          } else {
            setAlerta({ tipo: "error", mensaje: "Tipo de usuario desconocido." });
            scrollToAlert();
          }
        } else {
          // Mostrar error del servidor o credenciales inválidas
          setAlerta({
            tipo: "error",
            mensaje: data.error || "Correo o contraseña inválidos.",
          });
          scrollToAlert();
        }
      } catch (error) {
        // Manejar errores en la conexión o el fetch
        setAlerta({
          tipo: "error",
          mensaje: "No se pudo conectar con el servidor.",
        });
        scrollToAlert();
      }
      
  };

  const scrollToAlert = () => {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="contact-form">
      <h2 className="section-title">Inicio de sesión</h2>
      <p>Inicia sesión para revisar las solicitudes entrantes.</p>
      <div id="alert-container">
        {alerta && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
          </Stack>
        )}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <span className="material-icons">email</span>
          <input type="email" id="correo" name="correo" placeholder="Correo Electrónico" required />
        </div>

        <div className="form-group">
          <span className="material-icons">password</span>
          <input type="password" id="clave" name="clave" placeholder="Clave" required />
        </div>

        <button type="submit" className="btn-primary">
          <span className="material-icons">Login</span> Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
