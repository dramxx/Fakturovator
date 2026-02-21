using System.ComponentModel.DataAnnotations;

namespace Fakturovator.API.DTOs
{
    public class CreateDemoRequest
    {
        [Required]
        [StringLength(1000, MinimumLength = 1)]
        public string Content { get; set; } = string.Empty;
    }
}
