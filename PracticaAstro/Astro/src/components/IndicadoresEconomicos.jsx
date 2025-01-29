// IndicadoresEconomicos.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

const IndicadoresEconomicos = () => {
  const [datosEconomicos, setDatosEconomicos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la API
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const response = await fetch('https://mindicador.cl/api');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setDatosEconomicos(data);  // Guardar los datos de los indicadores
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []); // Se ejecuta una sola vez cuando el componente se monta

  // Si está cargando, muestra el spinner
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Si hay un error, muestra el mensaje de error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Mostrar los datos cuando se haya cargado correctamente
  return (
    <Box sx={{ padding: '20px' }}>
      <h2>Indicadores Económicos</h2>
      <p><strong>Unidad de Fomento (UF):</strong> {datosEconomicos.uf.valor} Pesos</p>
      <p><strong>Dólar Observado:</strong> {datosEconomicos.dolar.valor} Pesos</p>
      <p><strong>Euro:</strong> {datosEconomicos.euro.valor} Pesos</p>
      <p><strong>Índice de Precios al Consumidor (IPC):</strong> {datosEconomicos.ipc.valor} %</p>
      <p><strong>Unidad Tributaria Mensual (UTM):</strong> {datosEconomicos.utm.valor} Pesos</p>
      <p><strong>Imacec:</strong> {datosEconomicos.imacec.valor} %</p>
      <p><strong>Libra de Cobre:</strong> {datosEconomicos.libra_cobre.valor} Dólares</p>
      <p><strong>Tasa de Desempleo:</strong> {datosEconomicos.tasa_desempleo.valor} %</p>
      <p><strong>Bitcoin:</strong> {datosEconomicos.bitcoin.valor} Dólares</p>
    </Box>
  );
};

export default IndicadoresEconomicos;
