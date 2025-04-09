using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace EcoStepBackend.Auth;

[ApiController]
[Route("[controller]")]
public class AuthController(IConfiguration config) : ControllerBase
{
    private static List<User> users = new()
    {
        new User { Id = 1, Name = "john", PasswordHash = "123" },
        new User { Id = 2, Name = "jane", PasswordHash = "456" }
    };

    private readonly IConfiguration configField = config;

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromForm] string username, [FromForm] string password)
    {
        if (users.Any(u => u.Name == username))
            return BadRequest("User already exists.");
        var user = new User { Id = users.Count + 1, Name = username, PasswordHash = password };
        users.Add(user);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromForm] string username, [FromForm] string password)
    {
        var user = users.FirstOrDefault(u => u.Name == username && u.PasswordHash == password);
        if (user == null)
            return Unauthorized("Invalid credentials");
        var token = GenerateJwtToken(user);
        return Ok(new { Token = token });
    }

    private string GenerateJwtToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configField["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Name),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };
        var token = new JwtSecurityToken(
            issuer: configField["Jwt:Issuer"],
            audience: configField["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(1),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [Authorize]
    [HttpGet("profile/{id}")]
    public Task<IActionResult> Profile(int id)

    {
        var user = users.FirstOrDefault(u => u.Id == id);
        return Task.FromResult<IActionResult>(user == null ? NotFound() : Ok(user));
    }
}