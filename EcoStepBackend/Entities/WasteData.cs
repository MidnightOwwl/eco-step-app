namespace EcoStepBackend;

public class WasteData
{
    public long SurveyId { get; set; }
    
    public double FoodWasteKg { get; set; }
    public double OtherWasteKg { get; set; }
    
    public double PlasticWasteKg { get; set; }
    public double GlassWasteKg { get; set; }
    public double PaperWasteKg { get; set; }
    public double MetalWasteKg { get; set; }
    
    public double PlasticRecycledPercent { get; set; }
    public double GlassRecycledPercent { get; set; }
    public double PaperRecycledPercent { get; set; }
    public double MetalRecycledPercent { get; set; }
}