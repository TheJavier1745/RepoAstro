using Backend.Repositories;
using Backend.Models;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class LoginService : ILoginService
    {
        private readonly ILoginRepository _loginRepository;
        private readonly IConfiguration _configuration;

        // Constructor que inyecta el repositorio y la configuración
        public LoginService(ILoginRepository loginRepository, IConfiguration configuration)
        {
            _loginRepository = loginRepository;
            _configuration = configuration;
        }

        // Método para iniciar sesión y generar el token
        public async Task<LoginResult> LoginAsync(Usuario usuario)
        {
            if (usuario == null || string.IsNullOrEmpty(usuario.Correo) || string.IsNullOrEmpty(usuario.Contrasena))
            {
                return null; 
            }

            var user = await _loginRepository.ValidateUserAsync(usuario.Correo, usuario.Contrasena);

            if (user == null)
                return null;

            var token = GenerateJwtToken(user);

            return new LoginResult
            {
                Token = token,
                TipoUsuario = user.TipoUsuario,
                Nombre = user.Nombre
            };
        }

        // Método para generar el JWT token
        private string GenerateJwtToken(Usuario user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Nombre),
                new Claim(ClaimTypes.NameIdentifier, user.Correo),
                new Claim(ClaimTypes.Role, user.TipoUsuario)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token); 
        }
    }

    // Resultado del Login
    public class LoginResult
    {
        public string Token { get; set; }
        public string TipoUsuario { get; set; }
        public string Nombre { get; set; }
    }
}
