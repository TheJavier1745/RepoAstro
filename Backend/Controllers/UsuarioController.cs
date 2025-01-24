using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
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

  [HttpPost]
public async Task<IActionResult> ForgotPassword([FromBody] Usuario userRequest)
{
    try
    {
        var recoveryCode = await _passwordRecoveryService.GenerateRecoveryCodeAsync(userRequest.Correo);

        var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == userRequest.Correo);

        if (user == null)
        {
            return BadRequest(new { Message = "Correo no registrado." });
        }

        user.Contrasena = recoveryCode;
        await _context.SaveChangesAsync(); 

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
