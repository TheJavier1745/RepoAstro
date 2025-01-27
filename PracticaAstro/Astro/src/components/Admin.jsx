import React, { useState, useEffect } from "react"; 
import DataGridComponent from "./TablaMensajes"; 
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const AdminPanel = () => {
  const [rows, setRows] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [tipoUsuario, setUserType] = useState(""); 
  const [isInactive, setIsInactive] = useState(false); 

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("No se encontró el token. Por favor, inicia sesión.");

      const decodedToken = decodeJWT(token);  
      setUserType(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);


      if (decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "inactivo") {
        setIsInactive(true); 
        return; 
      }

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
      setRows(datos.map((dato) => ({
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
      })));
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";  
  };

  if (isInactive) {
    return (
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Alert severity="error">
          Usuario inactivo, por favor contactarse con soporte.
        </Alert>
      </Box>
    );
  }

  if (errorMessage) {
    return <div className="alert-error">{errorMessage}</div>;
  }

  return (
    <div>
      <h1>Panel de Administración</h1>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button
          variant="contained"
          color="error"
          style={{ padding: "10px 20px", cursor: "pointer", marginRight: "20px" }}
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Cerrar Sesión
        </Button>

        {tipoUsuario === "admin" && (
          <Button
            variant="contained"
            color="success"
            style={{ padding: "10px 20px", cursor: "pointer", marginRight: "20px" }}
            onClick={() => {
              window.location.href = "/administrarUsuarios";
            }}
            startIcon={<SupervisedUserCircleIcon />}
          >
            Administrar Usuarios
          </Button>
        )}

        {tipoUsuario === "admin" && (
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
        )}
      </div>

      <p>
        <h5>Solicitudes pendientes</h5>
        Bienvenido al panel de administración. Aquí podrás ver los mensajes de
        contacto recibidos a través del formulario de contacto de la página web.
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

const decodeJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(atob(base64)); 
  return decodedData; 
};

export default AdminPanel;
