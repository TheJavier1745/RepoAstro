import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

const IndicadoresEconomicos = () => {
  const [datosEconomicos, setDatosEconomicos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch('https://mindicador.cl/api');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setDatosEconomicos(data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []); 

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <CircularProgress size={20} />
      </Box>
    );
  }

  if (error) {
    return <div style={{ fontSize: '0.8em', color: 'red' }}>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: '10px', fontSize: '1em', textAlign: 'center' }}>
      <h5 style={{ margin: '0 0 10px 0' }}>Indicadores Económicos ({today})</h5>
      <p><strong>UF:</strong> {datosEconomicos.uf.valor} Pesos</p>
      <p><strong>Dólar:</strong> {datosEconomicos.dolar.valor} Pesos</p>
      <p><strong>Euro:</strong> {datosEconomicos.euro.valor} Pesos</p>
      <p><strong>IPC:</strong> {datosEconomicos.ipc.valor} %</p>
      <p><strong>UTM:</strong> {datosEconomicos.utm.valor} Pesos</p>
    </Box>
  );
};

export default IndicadoresEconomicos;
