using Backend.Models;
using Backend.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class DatoService : IDatoService
    {
        private readonly IDatoRepository _datoRepository;

        public DatoService(IDatoRepository datoRepository)
        {
            _datoRepository = datoRepository;
        }

        public async Task<bool> AddDatoAsync(Dato dato)
        {
            return await _datoRepository.AddDatoAsync(dato);
        }

        public async Task<List<Dato>> GetAllDatosAsync()
        {
            return await _datoRepository.GetAllAsync();
        }
    }
}
