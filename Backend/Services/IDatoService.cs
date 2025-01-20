using Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IDatoService
    {
        Task<bool> AddDatoAsync(Dato dato);
        Task<List<Dato>> GetAllDatosAsync();
    }
}