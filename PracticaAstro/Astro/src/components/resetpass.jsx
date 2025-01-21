import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Para acceder a los parámetros de la URL
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const ResetPasswordForm = () => {
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Obtiene los parámetros de la URL
  const email = new URLSearchParams(location.search).get("email");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const codigo = event.target.codigo.value.trim();
    const nuevaContrasena = event.target.nuevaContrasena.value.trim();
    const confirmarContrasena = event.target.confirmarContrasena.value.trim();

    if (!codigo || !nuevaContrasena || !confirmarContrasena) {
      setAlerta({ tipo: "error", mensaje: "Todos los campos son obligatorios." });
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setAlerta({ tipo: "error", mensaje: "Las contraseñas no coinciden." });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5079/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo, nuevaContrasena, correo: email }), // Asegúrate de pasar el email
      });

      const data = await response.json();

      if (response.ok) {
        setAlerta({ tipo: "success", mensaje: "Contraseña actualizada con éxito." });
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setAlerta({ tipo: "error", mensaje: data.Message || "Error al actualizar la contraseña." });
      }
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "No se pudo conectar con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2>Introduce el código y tu nueva contraseña</h2>
      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="text" id="codigo" name="codigo" placeholder="Código de Recuperación" required />
        </div>
        <div className="form-group">
          <input type="password" id="nuevaContrasena" name="nuevaContrasena" placeholder="Nueva Contraseña" required />
        </div>
        <div className="form-group">
          <input type="password" id="confirmarContrasena" name="confirmarContrasena" placeholder="Confirmar Contraseña" required />
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Restablecer Contraseña"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
