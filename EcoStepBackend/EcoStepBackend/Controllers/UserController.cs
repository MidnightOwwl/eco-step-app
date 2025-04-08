using Microsoft.AspNetCore.Mvc;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]/{id:long}")]
public class UserController : ControllerBase
{
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
