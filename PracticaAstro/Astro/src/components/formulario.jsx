import React, { useState, useRef } from "react";
import { TextField, Button, Alert, Box, InputAdornment, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from '@mui/icons-material/Send';

function validarRut(rut) {
  const rutLimpio = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  if (!/^[0-9]+[0-9K]$/.test(rutLimpio)) {
    return false;
  }
  const cuerpo = rutLimpio.slice(0, -1);
  const dv = rutLimpio.slice(-1);
  let suma = 0;
  let multiplicador = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += multiplicador * parseInt(cuerpo[i]);
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }
  const resto = 11 - (suma % 11);
  const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();
  return dv === dvEsperado;
}

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

    // Validar el RUT
    if (!validarRut(data.rut)) {
      setAlertMessage("El RUT ingresado no es válido. Asegúrate de ingresarlo sin puntos y con guion.");
      setAlertType("error");
      setShowAlert(true);
      scrollToForm();
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch("http://localhost:5079/api/formularioAPI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Error al enviar los datos.");
      }

      setAlertMessage("Formulario enviado con éxito.");
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
        label="Nombre"
        id="nombres"
        name="nombres"
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
        label="Apellido"
        id="apellidos"
        name="apellidos"
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <BadgeIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="RUT"
        id="rut"
        name="rut"
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CreditCardIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          e.target.value = e.target.value.replace(/[^0-9kK-]/g, "").replace(/\./g, "");
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
        label="Teléfono"
        id="telefono"
        name="telefono"
        type="tel"
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PhoneIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Mensaje"
        id="mensaje"
        name="mensaje"
        multiline
        rows={4}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MessageIcon />
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
    </Box>
  );
};

export default Formulario;
