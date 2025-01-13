export async function get() {
    try {
        const response = await fetch('http://localhost:5079/api/mensajes', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        
        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            
            return new Response(
                JSON.stringify({ error: 'Error al obtener los mensajes del servidor.' }),
                { status: response.status, headers: { 'Content-Type': 'application/json' } }
            );
        }
    } catch (error) {
        
        console.error('Error al conectar con el backend:', error);
        return new Response(
            JSON.stringify({ error: 'No se pudo conectar con el servidor.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
