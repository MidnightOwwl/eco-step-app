using Microsoft.AspNetCore.Mvc;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;
    
    [HttpGet("{userId:long}")]
    public IActionResult GetStats(long userId)
    {
        return Ok();
    }
}
