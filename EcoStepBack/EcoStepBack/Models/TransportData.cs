namespace EcoStepBackend;

public class TransportData
{
    public long SurveyId { get; set; }
    public double CarDistanceKm { get; set; }
    public CarFuelType CarFuelType { get; set; }
    public double PublicTransportDistance { get; set; }
    public double AirplaneDistance { get; set; }
}