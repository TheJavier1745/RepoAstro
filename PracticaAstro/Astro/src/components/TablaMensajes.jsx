import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const TablaMensajes = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost/src/utilitarios/get_data.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los datos del servidor');
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((row) => ({
          ...row,
          id: row.id,
          fecha_hora: row.fecha_hora || 'No disponible',
        }));
        setRows(formattedData);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
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
    return <p>Cargando mensajes...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ height: 500, width: '100%', overflowX: 'auto' }}>
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
