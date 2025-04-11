using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;
    
    [HttpGet("{userId:long}")]
    public IActionResult GetStats(long userId)
    {
        var user = _db.Users
            .Include(u => u.Surveys)
            .FirstOrDefault(u => u.Id == userId);
        
        if (user is null)
            return NotFound();

        return Ok(user.Surveys);
    }
}
