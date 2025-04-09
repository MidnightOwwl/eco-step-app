using Microsoft.AspNetCore.Mvc;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SurveyController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;
    
    [HttpGet("{userId:long}")]
    public IActionResult GetAllSurveys(long userId)
    {
        return Ok();
    }

    [HttpPost]
    public IActionResult CreateSurvey([FromBody] Survey survey)
    {
        return Ok();
    }

    [HttpPut("{id:long}")]
    public IActionResult UpdateSurvey(long id, [FromBody] Survey updated)
    {
        return Ok();
    }
}
