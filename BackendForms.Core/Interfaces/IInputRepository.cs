using System.Collections.Generic;
using System.Threading.Tasks;
using BackendForms.Core.Entities;

namespace BackendForms.Core.Interfaces
{
    public interface IInputRepository
    {
        Task<IEnumerable<Input>> GetInputsByFormIdAsync(int formId);
        Task<Input> CreateInputAsync(Input input);
        Task<Input> UpdateInputAsync(Input input);
        Task DeleteInputAsync(int id);

        Task<Input> GetInputByIdAsync(int id);

    }
}