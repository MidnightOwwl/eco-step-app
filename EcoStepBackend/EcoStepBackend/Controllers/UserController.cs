using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(AppDbContext db) : ControllerBase
{
    private readonly AppDbContext _db = db;

    [HttpGet("{id:long}")]
    public IActionResult GetUser(long id)
    {
        var user = _db.Users
            .Include(u => u.Household)
            .FirstOrDefault(u => u.Id == id);

        if (user is null)
            return NotFound();

        return Ok(user);
    }

    [HttpPut("{id:long}/household")]
    public IActionResult UpdateHousehold(long id, [FromBody] Household updated)
    {
        var user = _db.Users
            .Include(u => u.Household)
            .FirstOrDefault(u => u.Id == id);

        if (user is null)
            return NotFound();

        if (user.Household is null)
            user.Household = updated;
        else
            _db.Entry(user.Household).CurrentValues.SetValues(updated);

        _db.SaveChanges();

        return Ok(user.Household);
    }
    
    [HttpPost("create")]
    public IActionResult CreateUser([FromBody] User user)
    {
        user.Surveys = new List<Survey>();
        _db.Users.Add(user);
        _db.SaveChanges();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }
}