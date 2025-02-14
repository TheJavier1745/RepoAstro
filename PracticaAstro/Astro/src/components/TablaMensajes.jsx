import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

const DataGridComponent = ({ rows, columns, onDelete }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Add resizable: false to each column
  const updatedColumns = columns.map((column) => ({
    ...column,
    resizable: false,
  }));

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'tabla_mensajes.xlsx');
  };

  return (
    <div style={{ height: 600, width: '100%' }}>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={handleExport} style={{ marginBottom: '10px' }}>
            Descargar tabla como archivo Excel
          </Button>
          <DataGrid
            rows={rows}
            columns={updatedColumns}
            pageSize={10}
            rowsPerPageOptions={[10, 20, 50]}
            disableColumnFilter={false}
            disableColumnSelector={false}
            disableDensitySelector={false}
          />
        </>
      )}
    </div>
  );
};

export default DataGridComponent;
