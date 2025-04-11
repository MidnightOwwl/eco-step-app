using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SurveyController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;
    
    [HttpGet("{userId:long}")]
    public IActionResult GetAllSurveys(long userId)
    {
        var user = _db.Users
            .Include(u => u.Surveys)
            .FirstOrDefault(u => u.Id == userId);
        
        if (user is null)
            return NotFound();

        return Ok(user.Surveys);
    }
    
    [HttpGet("{userId:long}/last-survey")]
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

    [HttpPost]
    public IActionResult CreateSurvey([FromBody] Survey survey)
    {
        survey.CompletedAt = DateTime.UtcNow;
        var userId = survey.UserId;
        
        var user = _db.Users
            .Include(u => u.Surveys)
            .FirstOrDefault(u => u.Id == userId);
        
        if (user is null)
            return NotFound();
        
        user.Surveys.Add(survey);
        _db.SaveChanges();

        return CreatedAtAction(nameof(GetAllSurveys), new { userId = survey.UserId }, survey);
    }
}
