import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TablaAdministracionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); 

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:5079/api/admin/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al cargar los usuarios.");
      const data = await response.json();
      setUsuarios(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleChangeUserType = async (id, nuevoTipo) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5079/api/admin/cambiar-tipo-usuario/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(nuevoTipo),
      });

      if (!response.ok) throw new Error("Error al cambiar el tipo de usuario.");
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = (id) => {
    setUserToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5079/api/admin/eliminar-usuario/${userToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el usuario.");
      setDialogOpen(false);
      fetchUsuarios();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, resizable: false },
    { field: 'nombre', headerName: 'Nombre', width: 250, resizable: false },
    { field: 'correo', headerName: 'Correo', flex: 1, resizable: false },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 350,
      resizable: false,
      renderCell: (params) => {
        const [userType, setUserType] = useState(params.row.tipoUsuario); 

        const handleTypeChange = (e) => {
          setUserType(e.target.value); 
          handleChangeUserType(params.row.id, e.target.value); 
        };

        return (
          <>
            <FormControl variant="filled" style={{ marginRight: 10, minWidth: 200 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={userType}
                onChange={handleTypeChange}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="Delegado">Delegado</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
            {userType === "inactivo" && (
              <IconButton onClick={() => handleDeleteUser(params.row.id)} color="error">
                <DeleteIcon />
              </IconButton>
            )}
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '90%', maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <h1 style={{ fontSize: '2rem', margin: '0.5em 0' }}>Administración de usuarios</h1>
        <p style={{ fontSize: '1rem', margin: '0.5em 0' }}>
          Bienvenido al panel de administración de usuarios. Aquí podrás administrar
          los roles que tenga cada usuario registrado.
          <br />
          <b>Cualquier cambio realizado no será notificado al usuario en cuestión.</b>
        </p>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '10px' }}>
        <Button
          variant="contained"
          color="error"
          sx={{ padding: '10px 20px', cursor: 'pointer' }}
          onClick={() => {
            window.location.href = "/admin";
          }}
          startIcon={<ArrowBackIcon />}
        >
          Regresar sin hacer cambios
        </Button>
      </Box>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={usuarios}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableColumnFilter={false}
            disableColumnSelector={false}
            disableDensitySelector={false}
            sx={{
              '& .MuiDataGrid-cell': {
                fontSize: '1.4rem',
              },
              '& .MuiDataGrid-columnHeaders': {
                fontSize: '1.4rem',
              },
              '@media (max-width: 600px)': {
                '& .MuiDataGrid-cell': {
                  fontSize: '1rem',
                },
                '& .MuiDataGrid-columnHeaders': {
                  fontSize: '1rem',
                },
              },
            }}
          />
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este usuario?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">Cancelar</Button>
          <Button onClick={confirmDelete} color="secondary">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TablaAdministracionUsuarios;