import mysql from 'mysql2/promise';

export async function post({ body }) {
  const { nombre, apellido, rut, correo, telefono, mensaje } = body;

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'tu_contraseña',
      database: 'consultoraap',
    });

    const query = `
      INSERT INTO mensajes (nombre, apellido, rut, correo, telefono, mensaje, fecha_envio)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;
    const values = [nombre, apellido, rut, correo, telefono, mensaje];

    await connection.execute(query, values);
    await connection.end();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    return new Response(JSON.stringify({ error: 'Error al guardar el mensaje' }), { status: 500 });
  }
}
