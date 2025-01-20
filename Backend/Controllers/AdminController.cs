using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IDatoService _datoService;
        private readonly appDB _context;
        public AdminController(IDatoService datoService, appDB context)
        {
            _datoService = datoService;
            _context = context;
        }

        [HttpGet("mensajes")]
        public async Task<IActionResult> GetMensajes()
        {
            try
            {
                var mensajes = await _datoService.GetAllDatosAsync();
                return Ok(mensajes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = $"Error al obtener los mensajes: {ex.Message}" });
            }
        }

        [HttpPost("add-admin")]
        public async Task<IActionResult> AddAdmin([FromBody] Usuario datoRequest)
        {
            try
            {
                var nuevoUsuario = new Usuario
                {
                    TipoUsuario = datoRequest.TipoUsuario,
                    Nombre = datoRequest.Nombre,
                    Correo = datoRequest.Correo,
                    Contrasena = datoRequest.Contrasena,
                };

                _context.Usuarios.Add(nuevoUsuario);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Usuario agregado con éxito." });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al guardar el usuario:", ex.Message);
                return StatusCode(500, new { Message = "Error al enviar el formulario." });
            }
        }
    }
}
