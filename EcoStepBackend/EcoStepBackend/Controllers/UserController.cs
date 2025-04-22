using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController(AppDbContext db) : ControllerBase
{
    [HttpGet("{id:long}")]
    public IActionResult GetUser(long id)
    {
        var user = db.Users
            .Include(u => u.Household)
            .FirstOrDefault(u => u.Id == id);

        if (user is null)
            return NotFound();

        return Ok(user);
    }

    [HttpPut("{id:long}/household")]
    public IActionResult UpdateHousehold(long id, [FromBody] Household updated)
    {
        var user = db.Users
            .Include(u => u.Household)
            .FirstOrDefault(u => u.Id == id);

        if (user is null)
            return NotFound();

        if (user.Household is null)
            user.Household = updated;
        else
            db.Entry(user.Household).CurrentValues.SetValues(updated);

        db.SaveChanges();

        return Ok(user.Household);
    }
}