using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]/{userId:long}")]
public class StatsController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;
    
    [HttpGet("")]
    public IActionResult GetStats(long userId)
    {
        var user = _db.Users
            .Include(u => u.Surveys)
            .FirstOrDefault(u => u.Id == userId);
        
        if (user is null)
            return NotFound();

        return Ok(user.Surveys);
    }
    
    [HttpGet("last-survey")]
    public IActionResult GetLastSurvey(long userId)
    {
        var user = _db.Users
            .Include(u => u.Surveys)
            .FirstOrDefault(u => u.Id == userId);
        
        if (user is null)
            return NotFound();

        var lastSurvey = user.Surveys
            .OrderByDescending(s => s.CompletedAt)
            .FirstOrDefault();
        
        if (lastSurvey is null)
            return NotFound();
        
        return Ok(lastSurvey);
    }
}
