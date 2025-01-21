import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { forgotPassword } from "../pages/api/forgotpass"; // 
import SendIcon from '@mui/icons-material/Send';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setAlerta({ tipo: "error", mensaje: "Por favor, ingresa tu correo electrónico." });
      return;
    }

    try {
      setLoading(true);
      const data = await forgotPassword(email); 
      if (data.success) {
        setAlerta({ tipo: "success", mensaje: data.message });
        

    
        navigate(`/reset-password?email=${email}`);
      } else {
        setAlerta({ tipo: "error", mensaje: data.message || "No se pudo enviar el correo." });
      }
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "No se pudo conectar con el servidor." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h2 className="section-title">Recuperar Contraseña</h2>
      <p>Introduce tu correo electrónico para recuperar tu contraseña.</p>

      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading} variant="contained" startIcon={!loading && <SendIcon />}>
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
