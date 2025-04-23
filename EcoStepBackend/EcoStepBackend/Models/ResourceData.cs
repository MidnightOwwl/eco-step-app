namespace EcoStepBackend;

public class ResourceData
{
    public int Id { get; set; } 
    public int SurveyId { get; set; }
    public double WaterConsumptionL { get; set; }
    public double ElectricityConsumptionKWtH { get; set; }
    
    public const double WaterConsumptionLPerDay = 150;
    public const double ElectricityConsumptionKWtHPerDay = 10;
}