namespace EcoStepBackend;

public class WasteData
{
    public int Id { get; set; }
    public int SurveyId { get; set; }

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

    public const double FoodWasteKgPerDay = 0.3;
    public const double OtherWasteKgPerDay = 0.2;
    public const double PlasticWasteKgPerDay = 0.1;
    public const double GlassWasteKgPerDay = 0.05;
    public const double PaperWasteKgPerDay = 0.05;
    public const double MetalWasteKgPerDay = 0.05;
    public const double PlasticRecycledPercentPerDay = 0.8;
    public const double GlassRecycledPercentPerDay = 0.8;
    public const double PaperRecycledPercentPerDay = 0.8;
    public const double MetalRecycledPercentPerDay = 0.8;
}