using EcoStepBackend.Validators;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SurveyController(
    AppDbContext db,
    ISurveyDataValidator<FoodData> foodValidator,
    ISurveyDataValidator<ResourceData> resourceValidator,
    ISurveyDataValidator<TransportData> transportValidator,
    ISurveyDataValidator<WasteData> wasteValidator
) : ControllerBase
{
    private readonly AppDbContext _db = db;
    private readonly ISurveyDataValidator<FoodData> _foodValidator = foodValidator;
    private readonly ISurveyDataValidator<ResourceData> _resourceValidator = resourceValidator;
    private readonly ISurveyDataValidator<TransportData> _transportValidator = transportValidator;
    private readonly ISurveyDataValidator<WasteData> _wasteValidator = wasteValidator;
    
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
        
        ValidateSurvey(user, survey);
        user.Surveys.Add(survey);
        _db.SaveChanges();

        return CreatedAtAction(nameof(GetAllSurveys), new { userId = survey.UserId }, survey);
    }

    private void ValidateSurvey(User user, Survey survey)
    {
        var days = survey.ReportedDays;

        _foodValidator.Validate(user, survey.FoodData, days);
        _resourceValidator.Validate(user, survey.ResourceData, days);
        _transportValidator.Validate(user, survey.TransportData, days);
        _wasteValidator.Validate(user, survey.WasteData, days);
    }
}
