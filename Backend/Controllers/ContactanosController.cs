using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Backend.Controllers
{
    [Route("api/formularioAPI")]
    [ApiController]
    public class ContactanosController : ControllerBase
    {
        private readonly IDatoService _datoService;
        private readonly IEmailService _emailService;
        private readonly IReCaptchaService _reCaptchaService;  

        public ContactanosController(IDatoService datoService, IEmailService emailService, IReCaptchaService reCaptchaService)
        {
            _datoService = datoService;
            _emailService = emailService;
            _reCaptchaService = reCaptchaService;
        }

        [HttpPost]
public async Task<IActionResult> EnviarMensaje([FromBody] Dato dato, [FromQuery] string recaptchaResponse)
{
    if (string.IsNullOrEmpty(recaptchaResponse))
    {
        return BadRequest(new ApiResponse { Message = "El campo recaptchaResponse es obligatorio." });
    }
    var isRecaptchaValid=await _reCaptchaService.ValidateReCaptchaAsync(recaptchaResponse);
    if (!isRecaptchaValid)
    {
         return BadRequest(new ApiResponse { Message = "Verificación reCAPTCHA fallida. Por favor, intenta de nuevo." });
    }
    try
    {
        dato.Fecha_Hora = DateTime.Now;
        await _datoService.AddDatoAsync(dato);

        string asunto = "Nuevo mensaje de contacto";
        string contenido = $"Nombre: {dato.Nombres} <br> Correo: {dato.Correo} <br> Teléfono: {dato.Telefono} <br> Mensaje: {dato.Mensaje}";
        await _emailService.EnviarCorreo("consultoraap079@gmail.com", asunto, contenido);

        return Ok(new ApiResponse { Message = "Mensaje enviado correctamente." });
    }
    catch (Exception ex)
    {
        return BadRequest(new ApiResponse { Message = $"Error al enviar el mensaje: {ex.Message}" });
    }
}
    }
}