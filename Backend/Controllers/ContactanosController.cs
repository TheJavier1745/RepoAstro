using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
        public async Task<IActionResult> EnviarMensaje([FromBody] Dato dato)
        {
            try
            {
                
                dato.FechaHora = DateTime.Now;

                await _datoService.AddDatoAsync(dato);
                string asunto="Nuevo mensaje de contacto";
                string contenido=$"Nombre: {dato.Nombres} <br> Correo: {dato.Correo} <br> Teléfono: {dato.Telefono} <br> Mensaje: {dato.Mensaje}";
                await _emailService.EnviarCorreo("consultoraap079@gmail.com",asunto,contenido);
                return Ok(new { Message = "Mensaje enviado correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = $"Error al enviar el mensaje: {ex.Message}" });
            }
        }
    }
}
