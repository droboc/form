using System.Collections.Generic;
using System.Threading.Tasks;
using BackendForms.Core.Entities;

namespace BackendForms.Core.Interfaces
{
    public interface IFormRepository
    {
        Task<List<Form>> GetAllFormsAsync();
        Task<Form> GetFormByIdAsync(int id);
        Task<Form> CreateFormAsync(Form form);
        Task<Form> UpdateFormAsync(Form form);
        Task DeleteFormAsync(int id);
    }
}