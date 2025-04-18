namespace EcoStepBackend;

public class FoodData
{
    public int Id { get; set; } 
    public int SurveyId { get; set; }
    public double MeatEatenKg { get; set; }
    public double PlantEatenKg { get; set; }
    
    public const double MeatEatenKgPerDay = 0.0857;
    public const double PlantEatenKgPerDay = 0.5; 
}