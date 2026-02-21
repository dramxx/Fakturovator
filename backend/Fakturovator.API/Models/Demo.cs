using System.ComponentModel.DataAnnotations;

namespace Fakturovator.API.Models
{
    public class Demo
    {
        public Guid Id { get; set; }
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; }
    }
}
