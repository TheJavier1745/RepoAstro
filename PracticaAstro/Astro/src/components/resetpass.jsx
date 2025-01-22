import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Para acceder a los parámetros de la URL
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, TextField, InputAdornment } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

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
        body: JSON.stringify({ codigo, nuevaContrasena, correo: email }),
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
    <div className="contact-form" style={{ width: "100%", maxWidth: "400px", margin: "0 auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Restablecer Contraseña</h2>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>Introduce el código y tu nueva contraseña.</p>

      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campo de Código de Recuperación */}
        <TextField
          type="text"
          id="codigo"
          name="codigo"
          label="Código de Recuperación"
          placeholder="Código de Recuperación"
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Campo de Nueva Contraseña */}
        <TextField
          type="password"
          id="nuevaContrasena"
          name="nuevaContrasena"
          label="Nueva Contraseña"
          placeholder="Nueva Contraseña"
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Campo de Confirmar Contraseña */}
        <TextField
          type="password"
          id="confirmarContrasena"
          name="confirmarContrasena"
          label="Confirmar Contraseña"
          placeholder="Confirmar Contraseña"
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Botón para Enviar */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          sx={{ marginTop: "16px" }}
        >
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Restablecer Contraseña"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
