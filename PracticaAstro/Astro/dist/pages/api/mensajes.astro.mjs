export { renderers } from '../../renderers.mjs';

async function get() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            return new Response(
                JSON.stringify({ error: "No se encontró el token. Por favor, inicia sesión." }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const response = await fetch("http://api.yourmetrics.cl/api/mensajes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return new Response(JSON.stringify(data), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        } else {
            return new Response(
                JSON.stringify({ error: "Error al obtener los mensajes del servidor." }),
                { status: response.status, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        console.error("Error al conectar con el backend:", error);
        return new Response(
            JSON.stringify({ error: "No se pudo conectar con el servidor." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    get
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
