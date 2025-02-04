import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';

const TablaAdministracionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Almacenar el id del usuario a eliminar

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
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 250 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => {
        const [userType, setUserType] = useState(params.row.tipoUsuario); // Estado local por cada fila

        const handleTypeChange = (e) => {
          setUserType(e.target.value); // Cambiar el tipo localmente
          handleChangeUserType(params.row.id, e.target.value); // Llamar a la función para actualizar en la base de datos
        };

        return (
          <>
            {/* Lista desplegable para elegir el tipo de usuario */}
            <FormControl variant="filled" style={{ marginRight: 10, minWidth: 120 }}>
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

            {/* Eliminar solo si el usuario está inactivo */}
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
    <Box sx={{ height: 600, width: '100%' }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={usuarios}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableColumnFilter={false}
          disableColumnSelector={false}
          disableDensitySelector={false}
        />
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