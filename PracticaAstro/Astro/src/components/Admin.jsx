import React, { useEffect, useState } from "react";
import DataGridComponent from "./TablaMensajes"; // Asegúrate de tener este componente creado
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const AdminPanel = () => {
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      if (!token) throw new Error("No se encontró el token. Por favor, inicia sesión.");

      const response = await fetch("http://localhost:5079/api/admin/mensajes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Token inválido o expirado. Por favor, inicia sesión nuevamente.");
        } else {
          throw new Error("Error al obtener los datos del servidor.");
        }
      }

      const datos = await response.json();
      datos.forEach(dato => {
        console.log(dato.fecha_Hora);
      });
      setRows(
        datos.map((dato) => ({
          id: dato.id,
          nombres: dato.nombres,
          correo: dato.correo,
          mensaje: dato.mensaje,
          fecha_Hora: dato.fecha_Hora
            ? new Date(dato.fecha_Hora).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            : "Fecha no disponible",
        }))
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  if (errorMessage) {
    return <div className="alert-error">{errorMessage}</div>;
  }
  return (
    <div>
      <h1>Panel de Administración</h1>
      {/* Otros componentes del panel */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="error"
          style={{ padding: "10px 20px", cursor: "pointer", marginRight: "20px" }}
          onClick={() => {
            window.location.href = "/logout";
          }}
          startIcon={<LogoutIcon />}
        >
          Cerrar Sesión
        </Button>
        <Button
          variant="contained"
          style={{ padding: "10px 20px", cursor: "pointer" }}
          onClick={() => {
            window.location.href = "/agregarUsuario";
          }}
          startIcon={<PersonAddIcon />}
        >
          Agregar un Usuario
        </Button>
      </div>
      <p>

      </p>
      {rows.length > 0 ? (
        <DataGridComponent
          rows={rows}
          columns={[
            { field: "id", headerName: "ID", width: 80 },
            { field: "nombres", headerName: "Nombre", width: 150 },
            { field: "correo", headerName: "Correo", width: 250 },
            { field: "mensaje", headerName: "Mensaje", width: 300 },
            { field: "fecha_Hora", headerName: "Fecha y Hora", width: 200 },
          ]}
        />
      ) : (
        <p>No hay mensajes disponibles.</p>
      )}
    </div>
  );
};

export default AdminPanel;
