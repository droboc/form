using System.Collections.Generic;
using System.Threading.Tasks;
using BackendForms.Core.Entities;
using BackendForms.Core.Interfaces;
using BackendForms.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace BackendForms.Infrastructure.Repositories
{
    public class FormRepository : IFormRepository
    {
        private readonly ApplicationDbContext _context;

        public FormRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Form>> GetAllFormsAsync()
        {
            return await _context.Forms.Include(f => f.Inputs).ToListAsync();
        }

        public async Task<Form> GetFormByIdAsync(int id)
        {
            return await _context.Forms.Include(f => f.Inputs).FirstOrDefaultAsync(f => f.Id == id);
        }

        public async Task<Form> CreateFormAsync(Form form)
        {
            _context.Forms.Add(form);
            await _context.SaveChangesAsync();
            return form;
        }

        public async Task<Form> UpdateFormAsync(Form form)
        {
            _context.Entry(form).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return form;
        }

        public async Task DeleteFormAsync(int id)
        {
            var form = await _context.Forms.FindAsync(id);
            if (form != null)
            {
                _context.Forms.Remove(form);
                await _context.SaveChangesAsync();
            }
        }
    }
}
