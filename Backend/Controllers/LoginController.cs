using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly ILoginService _loginService;

        public LoginController(ILoginService loginService)
        {
            _loginService = loginService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Usuario loginRequest)
        {
            var result = await _loginService.LoginAsync(loginRequest);

            if (result == null)
            {
                return Unauthorized(new { Message = "Correo o contraseña inválidos." });
            }

            return Ok(new
            {
                Token = result.Token,
                TipoUsuario = result.TipoUsuario,
                Nombre = result.Nombre
            });
        }
    }
}
