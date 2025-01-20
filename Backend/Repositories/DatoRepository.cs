using Backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Backend.Repositories
{
    public class DatoRepository : IDatoRepository
    {
        private readonly appDB _context;

        public DatoRepository(appDB context)
        {
            _context = context;
        }

        public async Task<bool> AddDatoAsync(Dato dato)
        {
            await _context.Datos.AddAsync(dato);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<List<Dato>> GetAllAsync()
        {
            return await _context.Datos.ToListAsync();
        }
    }
}
