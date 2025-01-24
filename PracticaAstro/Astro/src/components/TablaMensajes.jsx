import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const DataGridComponent = ({ rows, columns ,onDelete}) => {
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableColumnFilter={false}
          disableColumnSelector={false}
          disableDensitySelector={false}
        />
      )}
    </div>
  );
};


export default DataGridComponent;
