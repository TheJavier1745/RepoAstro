using Backend.Services;
using Backend.utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

/// <summary>
/// Controlador para la administración de usuarios y mensajes.
/// </summary>
[Route("api/admin")]
[ApiController]
public class AdminController : ControllerBase
{
    private readonly IDatoService _datoService;
    private readonly appDB _context;
    private readonly EmailService _emailService;

    public AdminController(IDatoService datoService, appDB context, EmailService emailService)
    {
        _datoService = datoService;
        _context = context;
        _emailService = emailService;
    }

    /// <summary>
    /// Obtiene todos los mensajes de la base de datos.
    /// </summary>
    /// <returns>Lista de mensajes.</returns>
    [HttpGet("mensajes")]
    [ProducesResponseType(typeof(IEnumerable<Dato>), 200)]
    [ProducesResponseType(400)]
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

    /// <summary>
    /// Elimina un usuario por su ID.
    /// </summary>
    /// <param name="id">ID del usuario a eliminar.</param>
    /// <returns>Mensaje de éxito o error.</returns>
    [HttpDelete("eliminar-usuario/{id}")]
    [ProducesResponseType(200)]
    [ProducesResponseType(404)]
    [ProducesResponseType(400)]
    public async Task<IActionResult> EliminarUsuario(int id)
    {
        try
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                return NotFound(new { Message = "Usuario no encontrado." });
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Usuario eliminado con éxito." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { Message = $"Error al eliminar el usuario: {ex.Message}" });
        }
    }

    /// <summary>
    /// Agrega un nuevo administrador.
    /// </summary>
    /// <param name="datoRequest">Datos del nuevo usuario.</param>
    /// <returns>Mensaje de éxito.</returns>
    [HttpPost("add-admin")]
    [ProducesResponseType(200)]
    [ProducesResponseType(500)]
    public async Task<IActionResult> AddAdmin([FromBody] Usuario datoRequest)
    {
        try
        {
            var nuevoUsuario = new Usuario
            {
                TipoUsuario = datoRequest.TipoUsuario,
                Nombre = datoRequest.Nombre,
                Correo = datoRequest.Correo,
                Contrasena = HashHelper.HashSHA512(datoRequest.Contrasena),
            };

            _context.Usuarios.Add(nuevoUsuario);
            await _context.SaveChangesAsync();
            await _emailService.EnviarCorreo(
                nuevoUsuario.Correo,
                "Tu cuenta ha sido creada",
                $"Hola {datoRequest.Nombre}, tu cuenta ha sido creada. Tu contraseña temporal es: {datoRequest.Contrasena}."
            );

            return Ok(new { Message = "Usuario agregado con éxito. Se envió un correo con la contraseña temporal." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Error al enviar el formulario." });
        }
    }
}
