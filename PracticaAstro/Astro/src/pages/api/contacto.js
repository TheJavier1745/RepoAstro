import mysql from 'mysql2/promise';

export const prerender = false; // Importante para funciones server-side

export async function post({ request }) {
  try {
    const body = await request.json();
    const { nombre, apellido, rut, correo, telefono, mensaje } = body;

    const connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '', 
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
    console.error('Error al guardar en la base de datos:', error);
    return new Response(
      JSON.stringify({ error: 'Error al guardar en la base de datos' }),
      { status: 500 }
    );
  }
}
