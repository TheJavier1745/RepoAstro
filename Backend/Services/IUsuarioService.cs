using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IUsuarioService
    {
        Task<Usuario> GetUsuarioByCorreoAsync(string correo);
        Task<string> ChangePasswordAsync(string correo, string contrasena, string nuevaContrasena);
    }
}