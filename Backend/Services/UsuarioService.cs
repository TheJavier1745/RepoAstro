using Backend.Models;
using Backend.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly appDB _context;

        public UsuarioService(appDB context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Usuario> GetUsuarioByCorreoAsync(string correo)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == correo);
        }

        public async Task<string> ChangePasswordAsync(string correo, string contrasena, string nuevaContrasena)
        {
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == correo && u.Contrasena == contrasena);
            
            if (user == null)
            {
                return "Usuario o contraseña incorrectos.";
            }

            user.Contrasena = nuevaContrasena;
            await _context.SaveChangesAsync();

            return "Contraseña actualizada correctamente.";
        }
    }
}
