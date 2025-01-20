using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == resetRequest.Correo && u.Contrasena == resetRequest.Codigo);

            if (user == null)
            {
                return BadRequest(new { Message = "Código inválido o expirado." });
            }

            // Actualizar la contraseña con la nueva
            user.Contrasena = resetRequest.NuevaContrasena;
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Contraseña actualizada correctamente." });
        }
    }
}
