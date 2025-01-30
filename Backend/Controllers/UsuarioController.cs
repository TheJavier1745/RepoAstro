using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    /// <summary>
    /// Controlador para gestionar la recuperación de contraseñas.
    /// </summary>
    [Route("api/forgot-password")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioService _usuarioService;
        private readonly IConfiguration _configuration;
        private readonly IPasswordRecoveryService _passwordRecoveryService;
        private readonly appDB _context;

        public UsuarioController(IUsuarioService usuarioService, appDB context, IConfiguration configuration, IPasswordRecoveryService passwordRecoveryService)
        {
            _usuarioService = usuarioService;
            _configuration = configuration;
            _passwordRecoveryService = passwordRecoveryService;
            _context = context;
        }

        /// <summary>
        /// Genera un código de recuperación de contraseña y lo envía al correo proporcionado.
        /// </summary>
        /// <param name="userRequest">Solicitud que contiene el correo del usuario.</param>
        /// <returns>Mensaje indicando si el código fue enviado correctamente o si hubo algún error.</returns>
        /// <response code="200">Código de recuperación enviado con éxito.</response>
        /// <response code="400">Correo no registrado o error al generar el código.</response>
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        public async Task<IActionResult> ForgotPassword([FromBody] Usuario userRequest)
        {
            try
            {
                // Generar el código de recuperación
                var recoveryCode = await _passwordRecoveryService.GenerateRecoveryCodeAsync(userRequest.Correo);

                // Verificar si el usuario existe
                var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == userRequest.Correo);
                if (user == null)
                {
                    return BadRequest(new { Message = "Correo no registrado." });
                }

                // Guardar el código temporalmente como la contraseña
                user.Contrasena = recoveryCode;
                await _context.SaveChangesAsync();

                // Enviar el correo con el código
                await _passwordRecoveryService.SendRecoveryCodeEmailAsync(userRequest.Correo, recoveryCode);

                return Ok(new { Message = "Código de recuperación enviado." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = $"Error: {ex.Message}" });
            }
        }
    }
}
