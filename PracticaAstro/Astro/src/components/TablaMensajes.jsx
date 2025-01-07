import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const TablaMensajes = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  return (
    <Box sx={{ height: 500, width: '100%', margin: '0 auto' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        components={{
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true, 
            quickFilterProps: { debounceMs: 500 }, 
          },
        }}
        disableColumnFilter={false} 
        disableColumnSelector={false} 
        disableDensitySelector={false} 
      />
    </Box>
  );
};

export default TablaMensajes;
