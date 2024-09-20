namespace BackendForms.Core.Entities
{
    public class Input
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int FormId { get; set; }
        public Form? Form { get; set; }=null;
    }
}