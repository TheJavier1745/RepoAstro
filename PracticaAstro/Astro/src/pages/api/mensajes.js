export async function get() {
    try {
        const response = await fetch('http://localhost:5079/api/mensajes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        // Si el backend responde correctamente, devuelve la misma respuesta al cliente
        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            // Si el backend devuelve un error, envía un mensaje de error al cliente
            return new Response(
                JSON.stringify({ error: 'Error al obtener los mensajes del servidor.' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        // Si hay un error en la conexión, devuelve un mensaje de error
        console.error('Error al conectar con el backend:', error);
        return new Response(
            JSON.stringify({ error: 'No se pudo conectar con el servidor.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
