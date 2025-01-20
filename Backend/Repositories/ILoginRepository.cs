using Backend.Models;


namespace Backend.Repositories
{
    public interface ILoginRepository
    {
        Task<Usuario> ValidateUserAsync(string correo, string contrasena);
    }
}
