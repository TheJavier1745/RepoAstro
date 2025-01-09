import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const DataGridComponent = ({ rows, columns }) => {
  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={false}
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
        sx={{
          '& .MuiDataGrid-toolbarContainer': {
            justifyContent: 'flex-end',
          },
        }}
      />
    </Box>
  );
};

export default DataGridComponent;
