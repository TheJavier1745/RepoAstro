using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IUsuarioRepository
    {
        Task<Usuario> GetByCorreoAsync(string correo);
        Task<bool> UpdatePasswordAsync(Usuario user);
        Task<string> ChangePasswordAsync(string correo, string contrasena, string nuevaContrasena);
    }
}
