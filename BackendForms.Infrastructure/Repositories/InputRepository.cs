using System.Collections.Generic;
using System.Threading.Tasks;
using BackendForms.Core.Entities;
using BackendForms.Core.Interfaces;
using BackendForms.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;


namespace BackendForms.Infrastructure.Repositories
{
    public class InputRepository : IInputRepository
    {
        private readonly ApplicationDbContext _context;

        public InputRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Input>> GetInputsByFormIdAsync(int formId)
        {
            return await _context.Inputs.Where(i => i.FormId == formId).ToListAsync();
        }

        public async Task<Input> CreateInputAsync(Input input)
        {
            _context.Inputs.Add(input);
            await _context.SaveChangesAsync();
            return input;
        }

        

        public async Task<Input> GetInputByIdAsync(int id)
        {
            return await _context.Inputs.FindAsync(id);
        }

        public async Task<Input> UpdateInputAsync(Input input)
        {
            _context.Entry(input).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return input;
        }

        public async Task DeleteInputAsync(int id)
        {
            var input = await _context.Inputs.FindAsync(id);
            if (input != null)
            {
                _context.Inputs.Remove(input);
                await _context.SaveChangesAsync();
            }
        }
    }
}