using System.Collections.Generic;
using System.Threading.Tasks;
using BackendForms.Core.Entities;
using BackendForms.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;




namespace BackendForms.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InputController : ControllerBase
    {
        private readonly IInputRepository _inputRepository;

        private readonly IFormRepository _formRepository;

        public InputController(IInputRepository inputRepository, IFormRepository formRepository)
        {
            _inputRepository = inputRepository;
            _formRepository = formRepository;
        }

  
        [HttpGet("{formId}")]
        public async Task<ActionResult<IEnumerable<Input>>> GetInputsByFormId(int formId)
        {
            var inputs = await _inputRepository.GetInputsByFormIdAsync(formId);
            return Ok(inputs);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInput(int id, [FromBody] Input inputUpdate)
        {
            var existingInput = await _inputRepository.GetInputByIdAsync(id);
            if (existingInput == null)
                return NotFound($"No se encontró el input con ID {id}");

            existingInput.Name = inputUpdate.Name;
            existingInput.Type = inputUpdate.Type;

            existingInput.FormId = existingInput.FormId;

            var updatedInput = await _inputRepository.UpdateInputAsync(existingInput);

            return Ok(updatedInput);
        }

        

        [HttpPost]
        public async Task<ActionResult<Input>> CreateInput(Input input)
        {
            var createdInput = await _inputRepository.CreateInputAsync(input);
            return CreatedAtAction(nameof(GetInputsByFormId), new { id = createdInput.Id }, createdInput);
        }

        [HttpPost("form/{formId}")]
        public async Task<ActionResult<Input>> CreateInput(int formId, Input input)
        {
            var form = await _formRepository.GetFormByIdAsync(formId);
            if (form == null)
                return NotFound($"No se encontró el formulario con ID {formId}");

            input.FormId = formId;

            var createdInput = await _inputRepository.CreateInputAsync(input);

            return CreatedAtAction(nameof(GetInputsByFormId), new { formId = formId }, createdInput);
        }


       

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInput(int id)
        {
            await _inputRepository.DeleteInputAsync(id);
            return NoContent();
        }
    }
}   