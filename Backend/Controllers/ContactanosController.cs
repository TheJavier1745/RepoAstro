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
        private readonly EmailService _emailService;

        public ContactanosController(IDatoService datoService, EmailService emailService)
        {
            _datoService = datoService;
            _emailService = emailService;
        }

[HttpPost]
public async Task<IActionResult> EnviarMensaje([FromBody] Dato dato, [FromQuery] string recaptchaResponse)
{
    if (string.IsNullOrEmpty(recaptchaResponse))
    {
        return BadRequest(new { Message = "El campo recaptchaResponse es obligatorio." });
    }


    var client = new HttpClient();
    var secretKey = "6LeZ38QqAAAAAJITAfI5eeUPQbR_qvFZinFkOFiU";
    var content = new StringContent($"secret={secretKey}&response={recaptchaResponse}", Encoding.UTF8, "application/x-www-form-urlencoded");
    var result = await client.PostAsync("https://www.google.com/recaptcha/api/siteverify", content);
    var resultContent = await result.Content.ReadAsStringAsync();

    var reCaptcha = JsonConvert.DeserializeObject<ReCaptchaResponse>(resultContent);

    if (!reCaptcha.Success)
    {
        return BadRequest(new { Message = "Verificación reCAPTCHA fallida. Por favor, intenta de nuevo." });
    }

    try
    {
        dato.Fecha_Hora = DateTime.Now;
        await _datoService.AddDatoAsync(dato);
        string asunto = "Nuevo mensaje de contacto";
        string contenido = $"Nombre: {dato.Nombres} <br> Correo: {dato.Correo} <br> Teléfono: {dato.Telefono} <br> Mensaje: {dato.Mensaje}";
        await _emailService.EnviarCorreo("consultoraap079@gmail.com", asunto, contenido);
        return Ok(new { Message = "Mensaje enviado correctamente." });
    }
    catch (Exception ex)
    {
        return BadRequest(new { Message = $"Error al enviar el mensaje: {ex.Message}" });
    }
  }
}
}