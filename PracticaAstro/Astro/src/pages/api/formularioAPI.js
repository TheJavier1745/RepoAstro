import { prisma } from '../../../prisma/prisma';

export async function post({ request }) {
  const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });

  try {
    const body = await request.json();

    const { nombre, apellido, rut, correo, telefono, mensaje } = body;

    if (!nombre || !apellido || !rut || !correo || !telefono || !mensaje) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son obligatorios." }),
        { status: 400, headers }
      );
    }

    const savedData = await prisma.datos.create({
      data: {
        nombres: nombre,
        apellidos: apellido,
        rut,
        correo,
        telefono,
        mensaje,
      },
    });

    return new Response(
      JSON.stringify({ success: "Formulario enviado con éxito.", data: savedData }),
      { status: 200, headers }
    );
  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response(
      JSON.stringify({ error: "Error al guardar los datos." }),
      { status: 500, headers }
    );
  }
}

export async function options() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    status: 204,
  });
}
