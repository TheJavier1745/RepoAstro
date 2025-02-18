using Backend.Models;
using Backend.Services;
using Backend.utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    [Route("api/reset-password")]
    [ApiController]
    public class ResetPasswordController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly appDB _context;

        public ResetPasswordController(IEmailService emailService, appDB context)
        {
            _emailService = emailService;
            _context = context;
        }

        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetRequest)
        {
            if (resetRequest == null || string.IsNullOrEmpty(resetRequest.Correo) || string.IsNullOrEmpty(resetRequest.Codigo) || string.IsNullOrEmpty(resetRequest.NuevaContrasena))
            {
                return BadRequest(new ApiResponse { Message = "Todos los campos son obligatorios." });
            }

            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == resetRequest.Correo && u.Contrasena == resetRequest.Codigo);

            if (user == null)
            {
                return BadRequest(new ApiResponse { Message = "Código inválido o expirado." });
            }

            user.Contrasena = HashHelper.HashSHA512(resetRequest.NuevaContrasena);
            await _context.SaveChangesAsync();

            try
            {
                await _emailService.EnviarCorreo(
                    user.Correo,
                    "Confirmación de cambio de contraseña",
                    $"Hola {user.Nombre}, tu contraseña ha sido cambiada correctamente."
                );
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse { Message = "Error al enviar el correo." });
            }

            return Ok(new ApiResponse { Message = "Contraseña actualizada correctamente." });
        }
    
        /// <summary>
        /// Cambiar la contraseña del usuario.
        /// </summary>
        /// <param name="id">ID del usuario.</param>
        /// <param name="changePasswordRequest">Solicitud de cambio de contraseña.</param>
        /// <returns>Mensaje de éxito o error.</returns>
        [HttpPut("cambiar-contrasena/{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ChangePassword(int id, [FromBody] ChangePasswordRequest changePasswordRequest)
        {
            if (changePasswordRequest == null || string.IsNullOrEmpty(changePasswordRequest.CurrentPassword) || string.IsNullOrEmpty(changePasswordRequest.NewPassword))
            {
                return BadRequest(new ApiResponse { Message = "Todos los campos son obligatorios." });
            }

            var user = await _context.Usuarios.FindAsync(id);
            if (user == null)
            {
                return NotFound(new ApiResponse { Message = "Usuario no encontrado." });
            }

            if (user.Contrasena != HashHelper.HashSHA512(changePasswordRequest.CurrentPassword))
            {
                return BadRequest(new ApiResponse { Message = "La contraseña actual es incorrecta." });
            }

            user.Contrasena = HashHelper.HashSHA512(changePasswordRequest.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new ApiResponse { Message = "Contraseña actualizada correctamente." });
        }
    
    }
}
