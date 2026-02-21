using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Fakturovator.API.Data;
using Fakturovator.API.Models;
using Fakturovator.API.DTOs;

namespace Fakturovator.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DemoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Demo>>> GetDemos()
        {
            var demos = await _context.Demos.OrderByDescending(d => d.CreatedAt).ToListAsync();
            return Ok(demos);
        }

        [HttpPost]
        public async Task<ActionResult<Demo>> CreateDemo([FromBody] CreateDemoRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Content))
            {
                return BadRequest("Content cannot be empty");
            }

            var demo = new Demo
            {
                Content = request.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Demos.Add(demo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDemos), new { id = demo.Id }, demo);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDemo(Guid id)
        {
            var demo = await _context.Demos.FindAsync(id);
            if (demo == null)
            {
                return NotFound();
            }

            _context.Demos.Remove(demo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
