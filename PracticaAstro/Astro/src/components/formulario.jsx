import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Formulario = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
  
    try {
      const response = await fetch("/api/formularioAPI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Captura el error
        console.error("Error en la respuesta:", errorText);
        throw new Error("Error al enviar los datos.");
      }
  
      const result = await response.json();
      console.log("Respuesta del servidor:", result);
      alert("Formulario enviado con éxito.");
      event.target.reset();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert(error.message || "No se pudo conectar con el servidor.");
    }
    
    finally {
      setAlertOpen(true);
    }
  };

  const handleCloseAlert = () => setAlertOpen(false);

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="apellido">Apellido:</label>
        <input type="text" id="apellido" name="apellido" required />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="rut">RUT:</label>
        <input type="text" id="rut" name="rut" required />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="correo">Correo Electrónico:</label>
        <input type="email" id="correo" name="correo" required />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="telefono">Teléfono:</label>
        <input type="tel" id="telefono" name="telefono" required />
      </div>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="5" required></textarea>
      </div>
      <button type="submit">Enviar</button>
      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Formulario;
