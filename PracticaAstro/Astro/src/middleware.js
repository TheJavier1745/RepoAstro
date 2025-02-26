export async function onRequest(context, next) {
    console.log("Middleware ejecutado");
    if (!next) {
      throw new Error("next no está definido. Asegúrate de que se pasa correctamente.");
    }
    return await next();
  }
  