using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Backend.Controllers
{
    [Route("api/forgot-password")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IConfiguration _configuration;
        
        public UsuarioController(IUsuarioService usuarioService, IConfiguration configuration)
        {
            _usuarioService = usuarioService;
            _configuration = configuration; 
        }


        [HttpPost]
        public async Task<IActionResult> ForgotPassword([FromBody] Usuario userRequest)
        {
            var user = await _usuarioService.GetUsuarioByCorreoAsync(userRequest.Correo);

            if (user == null)
            {
                return BadRequest(new { Message = "Correo no registrado." });
            }
            
            var recoveryCode = new Random().Next(100000, 999999).ToString();

            user.Contrasena = recoveryCode;
            await _usuarioService.ChangePasswordAsync(user.Correo, user.Contrasena, recoveryCode); // Llamada a servicio para cambiar la contraseña

            try
            {
                var emailService = new EmailService(_configuration); 
                emailService.EnviarCorreo(
                    user.Correo,
                    "Código de recuperación de contraseña",
                    $"Tu código de recuperación es: {recoveryCode}"
                );
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = "Error al enviar el correo." });
            }

            return Ok(new { Message = "Código de recuperación enviado." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest resetRequest)
        {
            var result = await _usuarioService.ChangePasswordAsync(resetRequest.Correo, resetRequest.NuevaContrasena, resetRequest.Codigo);

            if (string.IsNullOrEmpty(result))
            {
                return BadRequest(new { Message = "Código inválido o expirado." });
            }

            return Ok(new { Message = "Contraseña actualizada correctamente." });
        }
    }
}
