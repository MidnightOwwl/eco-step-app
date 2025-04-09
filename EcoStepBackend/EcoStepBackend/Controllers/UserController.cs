using Microsoft.AspNetCore.Mvc;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]/{id:long}")]
public class UserController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;
    
    [HttpGet("")]
    public IActionResult GetUser(long id)
    {
        return Ok();
    }

    [HttpPut("household")]
    public IActionResult UpdateHousehold(long id, [FromBody] Household updated)
    {
        return Ok();
    }
}
