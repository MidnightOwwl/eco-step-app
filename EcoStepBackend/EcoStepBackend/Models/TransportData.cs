namespace EcoStepBackend;

public class TransportData
{
    public long SurveyId { get; set; }
    public double PublicTransportDistanceKm { get; set; }
    public double AirplaneDistanceKm { get; set; }
    public double TrainDistanceKm { get; set; }
    
    public double CarDistanceKmPetrol { get; set; }
    public double CarDistanceKmDiesel { get; set; }
    public double CarDistanceKmElectric { get; set; }
    public double CarDistanceKmHybrid { get; set; }
    public double CarDistanceKmHydrogen { get; set; }
    public double CarDistanceKmMethane { get; set; }
    public double CarDistanceKmPropane { get; set; }
    
    public const double CarDistanceKmPetrolPerDay = 28;
    public const double CarDistanceKmDieselPerDay = 32;
    public const double CarDistanceKmElectricPerDay = 109;
    public const double CarDistanceKmHybridPerDay = 54;
    public const double CarDistanceKmHydrogenPerDay = 109;
    public const double CarDistanceKmMethanePerDay = 42;
    public const double CarDistanceKmPropanePerDay = 42;
    public const double PublicTransportDistanceKmPerDay = 52;
    public const double AirplaneDistanceKmPerDay = 28;
    public const double TrainDistanceKmPerDay = 133;
}