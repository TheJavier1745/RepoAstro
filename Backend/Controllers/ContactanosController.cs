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

        public ContactanosController(IDatoService datoService)
        {
            _datoService = datoService;
        }

        [HttpPost]
        public async Task<IActionResult> EnviarMensaje([FromBody] Dato dato)
        {
            try
            {
                dato.FechaHora = DateTime.Now;

                await _datoService.AddDatoAsync(dato);

                return Ok(new { Message = "Mensaje enviado correctamente." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = $"Error al enviar el mensaje: {ex.Message}" });
            }
        }
    }
}
