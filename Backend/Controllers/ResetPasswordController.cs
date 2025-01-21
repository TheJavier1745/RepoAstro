using Backend.Models;
using Backend.Services;
using Backend.utils;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Backend.Controllers
{
    [Route("api/reset-password")]
    [ApiController]
    public class ResetPasswordController : ControllerBase
    {
        private readonly EmailService _emailService;
        private readonly appDB _context;

        public ResetPasswordController(EmailService emailService, appDB context)
        {
            _emailService = emailService;
            _context = context;
        }

        [HttpPost]
public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetRequest)
{
    if (resetRequest == null || string.IsNullOrEmpty(resetRequest.Correo) || string.IsNullOrEmpty(resetRequest.Codigo) || string.IsNullOrEmpty(resetRequest.NuevaContrasena))
    {
        return BadRequest(new { Message = "Todos los campos son obligatorios." });
    }

    var user = await _context.Usuarios
        .FirstOrDefaultAsync(u => u.Correo == resetRequest.Correo && u.Contrasena == resetRequest.Codigo);

    if (user == null)
    {
        return BadRequest(new { Message = "Código inválido o expirado." });
    }

    user.Contrasena = HashHelper.HashSHA512(resetRequest.NuevaContrasena);
    await _context.SaveChangesAsync();

    try
    {
        await _emailService.EnviarCorreo(
            user.Correo, 
            "Confirmación de cambio de contraseña", 
            $"Hola {user.Nombre},\n\nTu contraseña ha sido cambiada correctamente."
        );
    }
    catch (Exception ex)
    {
        return BadRequest(new { Message = "Error al enviar el correo." });
    }

    return Ok(new { Message = "Contraseña actualizada correctamente." });
}
}
}
