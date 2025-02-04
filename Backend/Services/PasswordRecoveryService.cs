using Backend.Models;
using Backend.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public interface IPasswordRecoveryService
    {
        Task<string> GenerateRecoveryCodeAsync(string correo);
        Task SendRecoveryCodeEmailAsync(string correo, string recoveryCode);
    }

    public class PasswordRecoveryService : IPasswordRecoveryService
    {
        private readonly IEmailService _emailService;
        private readonly appDB _context;
        private readonly IConfiguration _configuration;

        public PasswordRecoveryService(IEmailService emailService, appDB context, IConfiguration configuration)
        {
            _emailService = emailService;
            _context = context;
            _configuration = configuration;
        }

        public async Task<string> GenerateRecoveryCodeAsync(string correo)
        {
            var user = await _context.Usuarios.FirstOrDefaultAsync(u => u.Correo == correo );

            if (user == null)
            {
                throw new Exception("Correo no registrado.");
            }

            var recoveryCode = new Random().Next(100000, 999999).ToString();
            user.Contrasena = recoveryCode;  
            await _context.SaveChangesAsync();

            return recoveryCode;
        }

        public async Task SendRecoveryCodeEmailAsync(string correo, string recoveryCode)
        {
            try
            {
                await _emailService.EnviarCorreo(
                    correo,
                    "Código de recuperación de contraseña",
                    $"Tu código de recuperación es: {recoveryCode}"
                );
            }
            catch (Exception ex)
            {
                throw new Exception("Error al enviar el correo.", ex);
            }
        }
    }
}
