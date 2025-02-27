using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Controllers
{
    /// <summary>
    /// Controlador de autenticación que permite a los usuarios iniciar sesión.
    /// </summary>
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        /// <summary>
        /// Permite a un usuario iniciar sesión en el sistema y obtener un token JWT.
        /// </summary>
        /// <param name="loginRequest">Objeto que contiene el correo y la contraseña del usuario.</param>
        /// <returns>Un token JWT si la autenticación es exitosa.</returns>
        /// <response code="200">Inicio de sesión exitoso, se devuelve el token JWT.</response>
        /// <response code="401">Correo o contraseña inválidos.</response>
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> Login([FromBody] Usuario loginRequest)
        {
            var result = await _loginService.LoginAsync(loginRequest);

            if (result == null)
            {
                return Unauthorized(new { Message = "Correo o contraseña inválidos." });
            }

            return Ok(new LoginResult
            {
                Token = result.Token,
                TipoUsuario = result.TipoUsuario,
                Nombre = result.Nombre,
                UserId = result.UserId
            });
        }
    }
}
