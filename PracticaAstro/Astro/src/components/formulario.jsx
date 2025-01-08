import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "../styles/Formulario.css"; // Ruta relativa al archivo CSS

const Formulario = () => {
  const [alerta, setAlerta] = useState(null);

  const validarCorreo = (correo) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo) && correo.split("@")[0].length > 2;
  };

  const validarRut = (rut) => {
    const regex = /^[0-9]+-[0-9kK]{1}$/;
    if (!regex.test(rut)) return false;

    const [cuerpo, verificador] = rut.split("-");
    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplicador * parseInt(cuerpo[i]);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }

    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();

    return dvEsperado === verificador.toUpperCase();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const nombre = formData.get("nombre").trim();
    const apellido = formData.get("apellido").trim();
    const rut = formData.get("rut").trim();
    const correo = formData.get("correo").trim();
    const telefono = formData.get("telefono").trim();
    const mensaje = formData.get("mensaje").trim();

    // Validar campos vacíos
    if (!nombre || !apellido || !rut || !correo || !telefono || !mensaje) {
      setAlerta({ tipo: "error", mensaje: "Todos los campos son obligatorios." });
      scrollToAlert();
      return;
    }

    // Validar RUT
    if (!validarRut(rut)) {
      setAlerta({ tipo: "error", mensaje: "El RUT ingresado no es válido." });
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
      const response = await fetch("http://localhost/src/utilitarios/reg.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setAlerta({ tipo: "success", mensaje: "Formulario enviado con éxito." });
        event.target.reset();
        scrollToAlert();
      } else {
        setAlerta({ tipo: "error", mensaje: data.error || "Error al enviar el formulario." });
        scrollToAlert();
      }
    } catch (error) {
      setAlerta({ tipo: "error", mensaje: "No se pudo conectar con el servidor." });
      scrollToAlert();
    }
  };

  const scrollToAlert = () => {
    const alertContainer = document.getElementById("alert-container");
    alertContainer.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="contact-form">
      <h2 className="section-title">Contáctanos</h2>
      <p>Rellena el siguiente formulario para ponerte en contacto con nosotros.</p>
      <div id="alert-container">
        {alerta && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
          </Stack>
        )}
      </div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <span className="material-icons">person</span>
          <input type="text" id="nombre" name="nombre" placeholder="Nombre" required />
        </div>

        <div className="form-group">
          <span className="material-icons">badge</span>
          <input type="text" id="apellido" name="apellido" placeholder="Apellido" required />
        </div>

        <div className="form-group">
          <span className="material-icons">credit_card</span>
          <input type="text" id="rut" name="rut" placeholder="RUT (ej: 12345678-9)" required />
        </div>

        <div className="form-group">
          <span className="material-icons">email</span>
          <input type="email" id="correo" name="correo" placeholder="Correo Electrónico" required />
        </div>

        <div className="form-group">
          <span className="material-icons">phone</span>
          <input type="tel" id="telefono" name="telefono" placeholder="Teléfono" required />
        </div>

        <div className="form-group">
          <span className="material-icons">chat</span>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Mensaje"
            rows="5"
            required
            style={{ resize: "none" }}
          ></textarea>
        </div>

        <button type="submit" className="btn-primary">
          <span className="material-icons">send</span> Enviar
        </button>
      </form>
    </div>
  );
};

export default Formulario;
