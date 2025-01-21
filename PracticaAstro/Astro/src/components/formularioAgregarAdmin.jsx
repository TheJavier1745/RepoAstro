import React, { useState, useRef } from "react";
import { TextField, Button, Alert, Box, InputAdornment, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from '@mui/icons-material/Password';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Formulario = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); 
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5079/api/admin/add-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Error al enviar los datos.");
      }

      setAlertMessage("Usuario agregado con éxito.");
      setAlertType("success");
      event.target.reset();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      setAlertMessage(error.message || "No se pudo conectar con el servidor.");
      setAlertType("error");
    } finally {
      setLoading(false); // Desactivar el indicador de carga
      setShowAlert(true);
      scrollToForm();
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      window.scrollTo({
        top: formRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      ref={formRef}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      {showAlert && (
        <Alert severity={alertType} sx={{ marginBottom: 2 }}>
          {alertMessage}
        </Alert>
      )}
      
      <TextField
        label="Tipo de Usuario"
        id="tipoUsuario"
        name="tipoUsuario"
        value="admin"
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <TextField
        label="Nombre"
        id="nombre"
        name="nombre"
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Correo Electrónico"
        id="correo"
        name="correo"
        type="email"
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        input type="password"
        label="Contraseña"
        id="contrasena"
        name="contrasena"
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        type="submit"
        fullWidth
        disabled={loading} // Deshabilitar el botón mientras está cargando
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        startIcon={!loading && <SendIcon />}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar"}
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          window.location.href = "/admin";
        }}
        sx={{ marginTop: 2 }}
        startIcon={<ArrowBackIcon />}
      >
        Regresar sin hacer cambios
      </Button>
    </Box>
  );
};

export default Formulario;
