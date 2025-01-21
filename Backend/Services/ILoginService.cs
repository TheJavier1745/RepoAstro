using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface ILoginService
    {
        Task<LoginResult> LoginAsync(Usuario usuario);
    }
}
