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

  const formatNumber = (number) => {
    return new Intl.NumberFormat('es-CL').format(number);
  };

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
    <Box sx={{ padding: '10px', fontSize: '0.8em', textAlign: 'center' }}>
      <h5 style={{ margin: '0 0 10px 0' }}>Indicadores Económicos ({today})</h5>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        <p style={{ margin: '0 10px' }}><strong>UF:</strong> {formatNumber(datosEconomicos.uf.valor)} Pesos</p>
        <p style={{ margin: '0 10px' }}><strong>Dólar:</strong> {formatNumber(datosEconomicos.dolar.valor)} Pesos</p>
        <p style={{ margin: '0 10px' }}><strong>Euro:</strong> {formatNumber(datosEconomicos.euro.valor)} Pesos</p>
        <p style={{ margin: '0 10px' }}><strong>IPC:</strong> {formatNumber(datosEconomicos.ipc.valor)} %</p>
        <p style={{ margin: '0 10px' }}><strong>UTM:</strong> {formatNumber(datosEconomicos.utm.valor)} Pesos</p>
      </div>
    </Box>
  );
};

export default IndicadoresEconomicos;
