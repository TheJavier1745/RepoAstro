export async function post({ request }) {
    const headers = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });
  
    try {
      const body = await request.json(); 
    
      const response = await fetch('http://api.yourmetrics.cl/api/formularioAgregarAdmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body), 
      });
  
      const result = await response.json();
  
      if (response.ok) {
        return new Response(
          JSON.stringify({ success: "Usuario con éxito.", data: result }),
          { status: 200, headers }
        );
      } else {
        return new Response(
          JSON.stringify({ error: result.error || "Error al guardar los datos." }),
          { status: response.status, headers }
        );
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      return new Response(
        JSON.stringify({ error: "No se pudo conectar con el servidor." }),
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
  