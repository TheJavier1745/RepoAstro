using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class LoginRepository : ILoginRepository
    {
        private readonly appDB _context;

        public LoginRepository(appDB context)
        {
            _context = context;
        }

        public async Task<Usuario> ValidateUserAsync(string correo, string contrasena)
        {
            return await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Correo == correo && u.Contrasena == contrasena);
        }
    }
}
