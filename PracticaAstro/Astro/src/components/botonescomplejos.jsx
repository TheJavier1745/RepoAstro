import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const images = [
  {
    url: '/src/utilitarios/servicios-de-consultoría-a-empresas.jpg',
    title: 'Consultoría Empresarial',
    color: '#FFFFFF',
  },
  {
    url: '/src/utilitarios/adobestock-467965537-1024x684.jpeg',
    title: 'Gestión Financiera',
    color: '#FFFFFF',
  },
  {
    url: '/src/utilitarios/b2ap3_amp_trabajo-consultoria-empresa.jpg',
    title: 'Capacitación',
    color: '#FFFFFF',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300, // Mantener una buena altura visible
  width: '150%', // Se asegura de usar el espacio completo de la columna
  [theme.breakpoints.down('sm')]: {
    height: 150,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const BotonesComplejos = () => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))', // Asegura que se adapten al espacio
      gap: 19, // Espaciado entre botones
      padding: '20px',
      justifyItems: 'start', // Alinea los botones hacia la izquierda
      marginLeft: '-300px', // Desplaza aún más los botones hacia la izquierda
    }}
  >
    {images.map((image) => (
      <ImageButton
        focusRipple
        key={image.title}
        style={{
          width: image.width,
          color: image.color,
        }}
      >
        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <span>
          <Typography
            component="span"
            variant="h6"
            color="inherit"
            sx={{
              position: 'relative',
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              fontWeight: 'bold',
              fontSize: '1.5rem',
            }}
          >
            {image.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </span>
      </ImageButton>
    ))}
  </Box>
);

export default BotonesComplejos;
