import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockResetIcon from '@mui/icons-material/LockReset';

const TablaAdministracionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userToReset, setUserToReset] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (token && tokenExpiry) {
      const expiryDate = new Date(tokenExpiry);
      const now = new Date();
      if (now >= expiryDate) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpiry');
        window.location.href = "/login";
        return;
      }
    } else {
      window.location.href = "/login";
      return;
    }

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

  const handleResetPassword = (id) => {
    setUserToReset(id);
    setResetDialogOpen(true);
  };

  const confirmResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5079/api/reset-password/cambiar-contrasena/${userToReset}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) throw new Error("Error al restablecer la contraseña.");
      setResetDialogOpen(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 200 },
    { field: 'correo', headerName: 'Correo', flex: 1 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => {
        const [userType, setUserType] = useState(params.row.tipoUsuario);

        const handleTypeChange = (e) => {
          setUserType(e.target.value);
          handleChangeUserType(params.row.id, e.target.value);
        };

        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FormControl variant="filled" sx={{ minWidth: 120 }}>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={userType}
                onChange={handleTypeChange}
                sx={{
                  fontSize: { xs: '0.8rem', md: '1rem' },
                }}
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
            <IconButton onClick={() => handleResetPassword(params.row.id)} variant="contained" size="small" title="Restablecer contraseña">
              <LockResetIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 2 }}>
      <Box sx={{ marginBottom: 2 }}>
        <h1 style={{ fontSize: '2rem', margin: '0.5em 0' }}>Administración de usuarios</h1>
        <p style={{ fontSize: '1rem', margin: '0.5em 0' }}>
          Bienvenido al panel de administración de usuarios. Aquí podrás administrar
          los roles que tenga cada usuario registrado.
          <br />
          <b>Cualquier cambio realizado no será notificado al usuario en cuestión.</b>
        </p>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="error"
          sx={{ padding: '10px 20px', fontSize: { xs: '0.8rem', md: '1rem' } }}
          onClick={() => { window.location.href = "/admin"; }}
          startIcon={<ArrowBackIcon />}
        >
          Regresar sin hacer cambios
        </Button>
      </Box>

      <Box sx={{ width: '100%', overflowX: 'auto' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ width: '100%' }}>
            <DataGrid
              rows={usuarios}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              sx={{
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: '0.8rem', md: '1.4rem' },
                },
                '& .MuiDataGrid-columnHeaders': {
                  fontSize: { xs: '0.8rem', md: '1.4rem' },
                },
                '@media (max-width: 600px)': {
                  width: '100%',
                },
              }}
            />
          </Box>
        )}
      </Box>

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

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Restablecer contraseña</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Contraseña actual"
            type="password"
            fullWidth
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Nueva contraseña"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirmar nueva contraseña"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)} color="primary">Cancelar</Button>
          <Button onClick={confirmResetPassword} color="secondary">Restablecer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TablaAdministracionUsuarios;
