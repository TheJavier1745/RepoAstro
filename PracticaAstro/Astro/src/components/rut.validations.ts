function validarRut(rut) {
    // Elimina puntos y convierte a mayúscula
    const rutLimpio = rut.replace(/\./g, "").replace(/-/g, "").toUpperCase();
  
    // Valida el formato (solo números y un dígito verificador)
    if (!/^[0-9]+[0-9K]$/.test(rutLimpio)) {
      return false;
    }
  
    // Separa el cuerpo del dígito verificador
    const cuerpo = rutLimpio.slice(0, -1);
    const dv = rutLimpio.slice(-1);
  
    // Calcula el dígito verificador
    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplicador * parseInt(cuerpo[i]);
      multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resto = 11 - (suma % 11);
    const dvEsperado = resto === 11 ? "0" : resto === 10 ? "K" : resto.toString();
  
    // Retorna si el dígito verificador es válido
    return dv === dvEsperado;
  }
  