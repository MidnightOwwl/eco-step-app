namespace EcoStepBackend;

public class ResourceData
{
    public long SurveyId { get; set; }
    public double WaterConsumptionL { get; set; }
    public double ElectricityConsumptionKWtH { get; set; }
    
    public const double WaterConsumptionLPerDay = 150;
    public const double ElectricityConsumptionKWtHPerDay = 10;
}