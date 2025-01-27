import React, { useState, useEffect, useRef } from "react";
import { TextField, Button, Alert, Box, InputAdornment, CircularProgress, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from '@mui/icons-material/Password';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Formulario = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [tipoUsuario, setUserType] = useState(""); 
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [roles, setRoles] = useState([]); 
  const formRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAlertMessage("No se encontró el token. Por favor, inicia sesión.");
      setAlertType("error");
      setShowAlert(true);
      setIsTokenValid(false);
      return;
    }

    const decodedToken = decodeJWT(token); 
    setUserType(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);  

    if (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== "admin") {
      setAlertMessage("Acceso denegado. Solo los administradores pueden agregar usuarios.");
      setAlertType("error");
      setShowAlert(true);
      setIsTokenValid(false); 
    }

    fetchRoles();  
  }, []);

  const fetchRoles = async () => {

    setRoles(["admin", "Delegado","inactivo"]);  
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setAlertMessage("No se encontró el token. Por favor, inicia sesión.");
        setAlertType("error");
        setShowAlert(true); 
        return;
      }

      const response = await fetch("http://localhost:5079/api/admin/add-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
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
      setLoading(false); 
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

  if (!isTokenValid) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Alert severity="error">{alertMessage}</Alert>
      </Box>
    );
  }

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

      <FormControl fullWidth>
        <InputLabel>Tipo de Usuario</InputLabel>
        <Select
          label="Tipo de Usuario"
          id="tipoUsuario"
          name="tipoUsuario"
          required
          defaultValue=""
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
        type="password"
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
        disabled={loading} 
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

const decodeJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(atob(base64)); 
  return decodedData; 
};

export default Formulario;
