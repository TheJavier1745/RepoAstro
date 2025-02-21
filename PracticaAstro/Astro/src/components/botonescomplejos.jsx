import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import './botonescomplejos.css';

// Datos de los servicios con sus imágenes y descripción
const images = [
  {
    url: '../utilitarios/servicios-de-consultoría-a-empresas.jpg',
    title: 'Consultoría Empresarial',
    description: 'Asesoramiento estratégico para mejorar la eficiencia y rentabilidad de tu empresa.',
    color: '#FFFFFF',
  },
  {
    url: '../utilitarios/adobestock-467965537-1024x684.jpeg',
    title: 'Gestión Financiera',
    description: 'Soluciones innovadoras para optimizar la administración financiera y contable.',
    color: '#FFFFFF',
  },
  {
    url: '../utilitarios/b2ap3_amp_trabajo-consultoria-empresa.jpg',
    title: 'Capacitación',
    description: 'Formación especializada para potenciar el talento y habilidades de tu equipo.',
    color: '#FFFFFF',
  },
];

// Estilos para los botones de imagen
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    height: 200,
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
  backgroundPosition: 'center',
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

const BotonesComplejos = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);

  const handleOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, minmax(300px, 1fr))',
          },
          gap: 3,
          padding: '20px',
          justifyItems: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {images.map((image) => (
          <ImageButton
            focusRipple
            key={image.title}
            onClick={() => handleOpen(image)}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
            <span>
              <Typography
                component="span"
                variant="h6"
                sx={{
                  position: 'relative',
                  p: 4,
                  pt: 2,
                  pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  fontWeight: 'bold',
                  fontSize: '1.5rem',
                  color: "white",  // ✅ Texto blanco
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",  // ✅ Sombra para mejor contraste
                }}
              >
                {image.title}
                <ImageMarked className="MuiImageMarked-root" />
              </Typography>
            </span>
          </ImageButton>
        ))}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          className="zoom-in"
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            alignItems: 'center',
            justifyContent: 'space-between',
            width: {
              xs: '90%',
              sm: '70%',
              md: '60%',
            },
            backgroundColor: 'white',  
            borderRadius: '10px',
            padding: '20px',
            boxShadow: 24,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: "black",  
          }}
        >
          {/* Imagen en el modal */}
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '40%',
              },
              textAlign: 'center',
              marginBottom: {
                xs: 2,
                sm: 0,
              },
            }}
          >
            <img
              src={selectedService?.url}
              alt={selectedService?.title}
              style={{
                maxWidth: '100%',
                borderRadius: '8px',
              }}
            />
          </Box>

          {/* Texto en el modal */}
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '55%',
              },
              textAlign: 'center',
              padding: {
                xs: '10px',
                sm: '20px',
              },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                marginBottom: '10px',
                color: "black",  
              }}
            >
              {selectedService?.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginBottom: '20px',
                color: "black",  
              }}
            >
              {selectedService?.description}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cerrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default BotonesComplejos;
