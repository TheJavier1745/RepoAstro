import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const TablaMensajes = () => {
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('http://localhost/src/utilitarios/get_data.php') // Endpoint de tu servidor
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((row, index) => ({
          ...row,
          id: row.id || index + 1, // Si el ID no existe, generar uno
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
        
        // Intenta formatear la fecha
        try {
          const date = new Date(params.value);
          return date.toLocaleString('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
        } catch (error) {
          console.error('Error formateando la fecha:', params.value, error);
          return 'Formato de fecha inválido';
        }
      },
    },
  ];
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50]}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        disableColumnFilter={false} // Habilita el filtro en columnas
        disableColumnSelector={false} // Habilita el selector de columnas
        disableDensitySelector={false} // Habilita el cambio de densidad
        sx={{
          '& .MuiDataGrid-toolbarContainer': {
            justifyContent: 'flex-end', // Alinea la barra de búsqueda a la derecha
          },
        }}
      />
    </Box>
  );
};

export default TablaMensajes;
