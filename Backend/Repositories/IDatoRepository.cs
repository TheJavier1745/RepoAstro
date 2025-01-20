using Backend.Models;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public interface IDatoRepository
    {
        Task<bool> AddDatoAsync(Dato dato); 
        Task<List<Dato>> GetAllAsync();
    }
}
