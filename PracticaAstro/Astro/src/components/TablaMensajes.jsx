import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const DataGridComponent = ({ rows, columns }) => {
  const [loading, setLoading] = useState(true); // Estado de carga

  // Simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Cambiar a false cuando los datos estén listos
    }, 1500); // Simula un tiempo de carga de 1.5 segundos
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      {loading ? ( // Mostrar CircularProgress mientras se carga
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          disableColumnFilter={false}
          disableColumnSelector={false}
          disableDensitySelector={false}
          loading={loading} // Aquí se indica el estado de carga
          sx={{
            '& .MuiDataGrid-toolbarContainer': {
              justifyContent: 'flex-end',
            },
          }}
        />
      )}
    </Box>
  );
};

export default DataGridComponent;
