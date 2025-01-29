// JokeAPI.jsx
import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Button, Typography, Select, MenuItem } from '@mui/material';

const JokeAPI = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('Any'); // Categoría por defecto

  // Función para obtener un chiste de la API
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://v2.jokeapi.dev/joke/${category}?lang=es`);
      const data = await response.json();

      if (data.error) {
        throw new Error('No se pudo obtener un chiste');
      }

      setJoke(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar un chiste inicial al montar el componente
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Chistes Aleatorios</Typography>

      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        sx={{ width: '200px', marginBottom: '10px' }}
      >
        <MenuItem value="Any">Cualquier Categoría</MenuItem>
        <MenuItem value="Programming">Programación 💻</MenuItem>
        <MenuItem value="Misc">Misceláneos 🔄</MenuItem>
        <MenuItem value="Pun">Juegos de Palabras 😆</MenuItem>
        <MenuItem value="Spooky">Terror 👻</MenuItem>
        <MenuItem value="Christmas">Navidad 🎄</MenuItem>
      </Select>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : joke ? (
        <Box sx={{ marginTop: '20px', padding: '15px', border: '1px solid gray', borderRadius: '10px', maxWidth: '400px', margin: 'auto' }}>
          {joke.type === 'single' ? (
            <Typography variant="h6">{joke.joke}</Typography>
          ) : (
            <>
              <Typography variant="h6">{joke.setup}</Typography>
              <Typography variant="h6" sx={{ marginTop: '10px', fontWeight: 'bold' }}>{joke.delivery}</Typography>
            </>
          )}
        </Box>
      ) : null}

      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={fetchJoke}>
          Obtener Nuevo Chiste
        </Button>
      </Box>
    </Box>
  );
};

export default JokeAPI;
