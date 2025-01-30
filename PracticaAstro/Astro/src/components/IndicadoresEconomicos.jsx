import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

const IndicadoresEconomicos = () => {
  const [datosEconomicos, setDatosEconomicos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <h2>Indicadores Económicos</h2>
      <p><strong>Unidad de Fomento (UF):</strong> {datosEconomicos.uf.valor} Pesos</p>
      <p><strong>Dólar Observado:</strong> {datosEconomicos.dolar.valor}</p>
      <p><strong>Euro:</strong> {datosEconomicos.euro.valor}</p>
      <p><strong>Índice de Precios al Consumidor (IPC):</strong> {datosEconomicos.ipc.valor} %</p>
      <p><strong>Unidad Tributaria Mensual (UTM):</strong> {datosEconomicos.utm.valor} Pesos</p>

    </Box>
  );
};

export default IndicadoresEconomicos;
