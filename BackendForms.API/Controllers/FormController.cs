using System.Collections.Generic;
using System.Threading.Tasks;
using BackendForms.Core.Entities;
using BackendForms.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BackendForms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase
    {
        private readonly IFormRepository _formRepository;

        public FormController(IFormRepository formRepository)
        {
            _formRepository = formRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Form>>> GetAllForms()
        {
            var forms = await _formRepository.GetAllFormsAsync();
            return Ok(forms);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Form>> GetForm(int id)
        {
            var form = await _formRepository.GetFormByIdAsync(id);
            if (form == null)
                return NotFound();
            return Ok(form);
        }

        [HttpPost]
        public async Task<ActionResult<Form>> CreateForm(Form form)
        {
            var createdForm = await _formRepository.CreateFormAsync(form);
            return CreatedAtAction(nameof(GetForm), new { id = createdForm.Id }, createdForm);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateForm(int id, [FromBody] string newName)
        {
            var existingForm = await _formRepository.GetFormByIdAsync(id);
            if (existingForm == null)
                return NotFound($"No se encontró el formulario con ID {id}");

            existingForm.Name = newName;

            await _formRepository.UpdateFormAsync(existingForm);

            return Ok(existingForm);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForm(int id)
        {
            await _formRepository.DeleteFormAsync(id);
            return NoContent();
        }
    }
}