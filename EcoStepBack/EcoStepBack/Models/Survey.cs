namespace EcoStepBackend;

public class Survey
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public DateTime CompletedAt { get; set; }
    public FoodData FoodData { get; set; }
    public WasteData WasteData { get; set; }
    public TransportData TransportData { get; set; }
    public ResourceData ResourceData { get; set; }
}