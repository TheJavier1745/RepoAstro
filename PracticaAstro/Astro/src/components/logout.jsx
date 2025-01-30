import React, { useEffect, useState } from "react";
import { Alert, Stack, CircularProgress } from "@mui/material";

const Logout = () => {
  const [alerta, setAlerta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = async () => {
      try {

        localStorage.removeItem("token");
        console.log("Token eliminado del cliente.");


        setAlerta({ tipo: "success", mensaje: "Sesión cerrada correctamente." });

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        setAlerta({ tipo: "error", mensaje: "Error al cerrar sesión." });
      } finally {
        setLoading(false);
      }
    };

    logout();
  }, []);

  return (
    <div className="logout-form">
      <h2 className="section-title">Cerrando sesión</h2>
      <p>Por favor, espera mientras cerramos tu sesión.</p>


      {alerta && (
        <Stack sx={{ width: "100%", marginBottom: "15px" }} spacing={2}>
          <Alert severity={alerta.tipo}>{alerta.mensaje}</Alert>
        </Stack>
      )}


      {loading && <CircularProgress />}
    </div>
  );
};

export default Logout;
