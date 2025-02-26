export { renderers } from '../../renderers.mjs';

async function forgotPassword(email) {
    try {
      const response = await fetch("http://api.yourmetrics.cl/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: email }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al enviar el correo.");
      }
  
      return { success: true, message: "Correo enviado con éxito." };
    } catch (error) {
      console.error("Error en forgotPassword:", error);
      return { success: false, message: error.message };
    }
  }

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  forgotPassword
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
