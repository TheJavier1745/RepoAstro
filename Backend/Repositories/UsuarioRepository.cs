using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly appDB _context;
        public UsuarioRepository(appDB context)
        {
            _context = context;
        }


        public async Task<Usuario> GetByCorreoAsync(string correo)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == correo);
        }

        public async Task<string> ChangePasswordAsync(string correo, string contrasena, string nuevaContrasena)
        {
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == correo && u.Contrasena == contrasena);

            if (user == null)
                return "Usuario o contraseña incorrectos.";

            user.Contrasena = nuevaContrasena; 
            await _context.SaveChangesAsync(); 

            return "Contraseña actualizada correctamente.";
        }

        public async Task<bool> UpdatePasswordAsync(Usuario user)
        {
            _context.Usuarios.Update(user); 
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}
