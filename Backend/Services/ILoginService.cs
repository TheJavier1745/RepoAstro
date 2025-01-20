using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface ILoginService
    {
        Task<LoginResult> LoginAsync(Usuario usuario);  
    }
       public class LoginResult
    {
        public string Token { get; set; }
        public string TipoUsuario { get; set; }
        public string Nombre { get; set; }
    }
}
