import mysql from 'mysql2/promise';

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '', // Cambia esto si tu base de datos tiene contraseña
      database: 'consultoraap',
    });

    console.log('Conexión exitosa a la base de datos');
    await connection.end();
  } catch (error) {
    console.error('Error al conectarse a la base de datos:', error);
  }
}

testConnection();