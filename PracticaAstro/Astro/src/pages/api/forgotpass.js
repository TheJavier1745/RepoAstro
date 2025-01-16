export async function forgotPassword(email) {
    try {
      const response = await fetch("http://localhost:5079/api/forgot-password", {
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
  