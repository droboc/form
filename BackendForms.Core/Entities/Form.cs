using System.Collections.Generic;

namespace BackendForms.Core.Entities
{
    public class Form
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Input> Inputs { get; set; } = new List<Input>();
    }
}
