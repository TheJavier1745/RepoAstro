import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const TablaMensajes = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost/src/utilitarios/get_data.php')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((row) => ({
          ...row,
          id: row.id,
          fecha_hora: row.fecha_hora || 'No disponible',
        }));
        setRows(formattedData);
      })
      .catch((error) => console.error('Error al obtener los datos:', error))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'nombres', headerName: 'Nombre', width: 150 },
    { field: 'correo', headerName: 'Correo', width: 250 },
    { field: 'mensaje', headerName: 'Mensaje', width: 300 },
    {
      field: 'fecha_hora',
      headerName: 'Fecha y Hora',
      width: 200,
      valueFormatter: (params) => {
        if (!params.value || params.value === 'No disponible') return 'No disponible';
        const date = new Date(params.value);
        return date.toLocaleString('es-CL', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      },
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div style={{ height: '100%', width: '95%', margin: '0 auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        autoHeight
      />
    </div>
  );
};

export default TablaMensajes;
