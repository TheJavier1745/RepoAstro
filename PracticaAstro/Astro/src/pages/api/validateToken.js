const validarToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No hay token almacenado.");
      return;
    }
  
    try {
      const response = await fetch("http://api.yourmetrics.cl/api/validatetoken", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Token válido:", data);
      } else {
        console.error("Token inválido o expirado:", data);
        localStorage.removeItem("token"); 
      }
    } catch (error) {
      console.error("Error al validar el token:", error);
    }
  };
  