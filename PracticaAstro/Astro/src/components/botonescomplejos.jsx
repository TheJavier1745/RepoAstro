import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import './botonescomplejos.css';

// Definir los datos de los servicios con su contenido para el modal
const images = [
  {
    url: '/src/utilitarios/servicios-de-consultoría-a-empresas.jpg',
    title: 'Consultoría Empresarial',
    description: 'Asesoramiento estratégico para mejorar la eficiencia y rentabilidad de tu empresa.',
    color: '#FFFFFF',
  },
  {
    url: '/src/utilitarios/adobestock-467965537-1024x684.jpeg',
    title: 'Gestión Financiera',
    description: 'Soluciones innovadoras para optimizar la administración financiera y contable.',
    color: '#FFFFFF',
  },
  {
    url: '/src/utilitarios/b2ap3_amp_trabajo-consultoria-empresa.jpg',
    title: 'Capacitación',
    description: 'Formación especializada para potenciar el talento y habilidades de tu equipo.',
    color: '#FFFFFF',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 300,
  width: '150%',
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
  backgroundPosition: 'center 33%',
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
  // Estado para controlar la apertura del modal
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
          gridTemplateColumns: 'repeat(3, minmax(300px, 1fr))',
          gap: 19,
          padding: '20px',
          justifyItems: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: '-30px'
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
            onClick={() => handleOpen(image)}
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
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '60%',
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: 24,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Lado izquierdo: Imagen */}
        <Box
          sx={{
            width: '40%',
            height: '100%',
            backgroundImage: `url(${selectedService?.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '8px',
          }}
        />

        {/* Lado derecho: Texto */}
        <Box
          sx={{
            width: '55%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
            {selectedService?.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '20px' }}>
            {selectedService?.description}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleClose} sx={{ alignSelf: 'flex-end' }}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
    </>
  );
};

export default BotonesComplejos;
