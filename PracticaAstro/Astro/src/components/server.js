const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.get('/api/mensajes', async (req, res) => {
  try {
    const mensajes = await prisma.mensaje.findMany({
      orderBy: { fecha_hora: 'desc' },
    });
    res.json(mensajes);
  } catch (error) {
    console.error('Error obteniendo mensajes:', error);
    res.status(500).json({ error: 'Error al obtener mensajes.' });
  }
});

app.post('/api/mensajes', async (req, res) => {
  const { nombres, correo, mensaje } = req.body;
  try {
    const nuevoMensaje = await prisma.mensaje.create({
      data: { nombres, correo, mensaje },
    });
    res.json(nuevoMensaje);
  } catch (error) {
    console.error('Error creando mensaje:', error);
    res.status(500).json({ error: 'Error al crear el mensaje.' });
  }
});
const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
