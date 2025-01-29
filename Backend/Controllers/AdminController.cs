using Backend.Models;
using Backend.Services;
using Backend.utils;
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
        private readonly EmailService _emailService;
        public AdminController(IDatoService datoService, appDB context, EmailService emailService)
        {
            _datoService = datoService;
            _context = context;
            _emailService = emailService;
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
        [HttpDelete("eliminar-usuario/{id}")]
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
                    Contrasena = HashHelper.HashSHA512(datoRequest.Contrasena),
                };

                _context.Usuarios.Add(nuevoUsuario);
                await _context.SaveChangesAsync();
                await _emailService.EnviarCorreo(
                    nuevoUsuario.Correo, 
                    "Tu cuenta ha sido creada",
                    $"Hola {datoRequest.Nombre}, tu cuenta ha sido creada. Tu contraseña temporal es: {datoRequest.Contrasena}. Por favor, cámbiala lo antes posible desde la opción 'Olvidaste tu contraseña'."
                );

                return Ok(new { Message = "Usuario agregado con éxito. Se envió un correo con la contraseña temporal." });
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error al guardar el usuario:", ex.Message);
                return StatusCode(500, new { Message = "Error al enviar el formulario." });
            }
        }

 [HttpPut("activar-inactivar-usuario/{id}")]
public async Task<IActionResult> ActivarInactivarUsuario(int id, [FromBody] string nuevoTipo)
{
    try
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound(new { Message = "Usuario no encontrado." });
        }

        if (nuevoTipo == "inactivo")
        {
            usuario.TipoUsuario = "inactivo";
        }


        await _context.SaveChangesAsync();

        return Ok(new { Message = "Estado del usuario actualizado correctamente." });
    }
    catch (Exception ex)
    {
        return BadRequest(new { Message = $"Error al actualizar el usuario: {ex.Message}" });
    }
}

[HttpPut("cambiar-tipo-usuario/{id}")]
public async Task<IActionResult> CambiarTipoUsuario(int id, [FromBody] string nuevoTipo)
{
    try
    {
        var usuario = await _context.Usuarios.FindAsync(id);
        if (usuario == null)
        {
            return NotFound(new { Message = "Usuario no encontrado." });
        }

        if (nuevoTipo != "admin" && nuevoTipo != "Delegado" && nuevoTipo != "inactivo")
        {
            return BadRequest(new { Message = "Tipo de usuario inválido." });
        }

        usuario.TipoUsuario = nuevoTipo;
        await _context.SaveChangesAsync();

        return Ok(new { Message = $"Tipo de usuario actualizado a {nuevoTipo}." });
    }
    catch (Exception ex)
    {
        return BadRequest(new { Message = $"Error al actualizar el tipo de usuario: {ex.Message}" });
    }
}

        [HttpGet("usuarios")]
public async Task<IActionResult> GetUsuarios()
{
 try
    {
        var usuarios = await _context.Usuarios.ToListAsync();

        var usuariosDto = usuarios.Select(u => new UsuarioDto
        {
            Id = u.Id,
            Nombre = u.Nombre,
            Correo = u.Correo,
            TipoUsuario = u.TipoUsuario
        }).ToList();

        return Ok(usuariosDto);
    }
    catch (Exception ex)
    {
        return BadRequest(new { Message = $"Error al obtener los usuarios: {ex.Message}" });
    }
}   }
}
