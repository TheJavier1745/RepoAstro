export async function post({ request }) {
    const body = await request.json();

    try {
        const response = await fetch('http://localhost:5079/api/login', { 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error al conectar con el backend:', error);
        return new Response(
            JSON.stringify({ Message: 'No se pudo conectar con el servidor.' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
