using Microsoft.AspNetCore.Mvc;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatsController : ControllerBase
{
    [HttpGet("{userId:long}")]
    public IActionResult GetStats(long userId)
    {
        return Ok();
    }
}
