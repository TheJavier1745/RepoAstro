import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { forgotPassword } from "../pages/api/forgotpass"; 
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
    <div className="contact-form" style={{ width: "100%", maxWidth: "400px", margin: "0 auto", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", fontSize: "24px", marginBottom: "20px" }}>Recuperar Contraseña</h2>
      

      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}

      <form onSubmit={handleSubmit}>
        {/* Campo de correo electrónico */}
        <TextField
          type="email"
          label="Correo Electrónico"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Botón de enviar */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={loading}
          startIcon={!loading && <SendIcon />}
          sx={{ marginTop: "16px" }}
        >
          {loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "Enviar"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
