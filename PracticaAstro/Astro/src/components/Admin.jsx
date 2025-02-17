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

  useEffect(() => {
    fetchData();
  }, []);

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

      if (!response.ok) throw new Error("Error al obtener los datos del servidor.");

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
    <Box sx={{ width: "90%", margin: "0 auto", padding: 2 }}>
      <h1 style={{ fontSize: "2rem", margin: "0.5em 0" }}>Panel de Administración</h1>

      <Box 
        sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" }, 
          justifyContent: "space-between", 
          alignItems: "center", 
          gap: { xs: "10px", md: "30%" }, 
          marginBottom: 3 
        }}
      >
        <Button
          variant="contained"
          color="error"
          sx={{ padding: "10px 20px", fontSize: { xs: "0.8rem", md: "1rem" } }}
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Cerrar Sesión
        </Button>

        {tipoUsuario === "admin" && (
          <Button
            variant="contained"
            color="success"
            sx={{ padding: "10px 20px", fontSize: { xs: "0.8rem", md: "1rem" } }}
            onClick={() => { window.location.href = "/administrarUsuarios"; }}
            startIcon={<SupervisedUserCircleIcon />}
          >
            Administrar Usuarios
          </Button>
        )}

        {tipoUsuario === "admin" && (
          <Button
            variant="contained"
            sx={{ padding: "10px 20px", fontSize: { xs: "0.8rem", md: "1rem" } }}
            onClick={() => { window.location.href = "/agregarUsuario"; }}
            startIcon={<PersonAddIcon />}
          >
            Agregar un Usuario
          </Button>
        )}
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <h5>Solicitudes pendientes</h5>
        <p>
          Bienvenido al panel de administración. Aquí podrás ver los mensajes de
          contacto recibidos a través del formulario de contacto de la página web.
        </p>
      </Box>

      <Box sx={{ width: "100%", overflowX: "auto" }}>
        {rows.length > 0 ? (
          <DataGridComponent
            rows={rows}
            columns={[
              { field: "id", headerName: "ID", width: 80 },
              { field: "nombres", headerName: "Nombre", width: 150 },
              { field: "correo", headerName: "Correo", width: 250 },
              { field: "mensaje", headerName: "Mensaje", width: 800, renderCell: (params) => (
                <div style={{ whiteSpace: "normal", wordWrap: "break-word", maxWidth: "800px" }}>
                  {params.value}
                </div>
              ) },
              { field: "fecha_Hora", headerName: "Fecha y Hora", width: 200 },
            ]}
            autoHeight
          />
        ) : (
          <p>No hay mensajes disponibles.</p>
        )}
      </Box>
    </Box>
  );
};

const decodeJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = JSON.parse(atob(base64)); 
  return decodedData; 
};

export default AdminPanel;
