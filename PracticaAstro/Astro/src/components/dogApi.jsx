
import React, { useState, useEffect } from 'react';
import { CircularProgress, Box, Button, Typography, MenuItem, Select } from '@mui/material';

const DogAPI = () => {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const fetchRandomDog = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      setError('Error al cargar la imagen');
    } finally {
      setLoading(false);
    }
  };

  const fetchBreeds = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const data = await response.json();
      setBreeds(Object.keys(data.message));
    } catch (error) {
      setError('Error al cargar la lista de razas');
    }
  };

  const fetchBreedImage = async (breed) => {
    setLoading(true);
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
      const data = await response.json();
      setDogImage(data.message);
    } catch (error) {
      setError('Error al cargar la imagen de la raza');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomDog();
    fetchBreeds();
  }, []);

  return (
    <Box sx={{ padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Perros</Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box>
          <img
            src={dogImage}
            alt="Perro"
            style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </Box>
      )}

      <Box sx={{ marginTop: '20px' }}>
        <Button variant="contained" onClick={fetchRandomDog} sx={{ marginRight: '10px' }}>
          Nueva Imagen Aleatoria
        </Button>

        <Select
          value={selectedBreed}
          onChange={(e) => {
            setSelectedBreed(e.target.value);
            fetchBreedImage(e.target.value);
          }}
          displayEmpty
          sx={{ width: '200px' }}
        >
          <MenuItem value="" disabled>Seleccionar Raza</MenuItem>
          {breeds.map((breed) => (
            <MenuItem key={breed} value={breed}>
              {breed.charAt(0).toUpperCase() + breed.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default DogAPI;
