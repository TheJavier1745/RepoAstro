import React, { useEffect, useState } from "react";
import DataGridComponent from "./TablaMensajes";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const AdminPanel = () => {
  const [rows, setRows] = useState([]); // Datos para el DataGrid
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [errorMessage, setErrorMessage] = useState(""); // Mensaje de error

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token
      if (!token) {
        throw new Error("No se encontró el token de autenticación. Por favor, inicia sesión.");
      }

      const response = await fetch("http://localhost:5079/api/mensajes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.text(); // Capturar el error devuelto por el backend
        throw new Error(errorResponse || "Error al obtener los mensajes del servidor.");
      }

      const responseBody = await response.text();
      if (!responseBody) {
        throw new Error("El servidor devolvió una respuesta vacía.");
      }

      const datos = JSON.parse(responseBody); // Parsear el JSON
      setRows(
        datos.map((dato) => ({
          id: dato.id,
          nombres: dato.nombres,
          correo: dato.correo,
          mensaje: dato.mensaje,
          fecha_hora: dato.fecha_hora
            ? new Date(dato.fecha_hora).toLocaleString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Fecha no disponible",
        }))
      );
    } catch (error) {
      setErrorMessage(error.message || "No se pudo conectar con el servidor.");
      console.error("Error al conectar con la API:", error);
    } finally {
      setLoading(false); // Detener el indicador de carga
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel de Administración</h2>
      {loading ? (
        <CircularProgress />
      ) : errorMessage ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : rows.length > 0 ? (
        <DataGridComponent rows={rows} columns={columns} />
      ) : (
        <p>No hay mensajes disponibles.</p>
      )}
    </div>
  );
};

// Configuración de las columnas del DataGrid
const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "nombres", headerName: "Nombre", width: 150 },
  { field: "correo", headerName: "Correo", width: 250 },
  { field: "mensaje", headerName: "Mensaje", width: 300 },
  { field: "fecha_hora", headerName: "Fecha y Hora", width: 200 },
];

export default AdminPanel;
