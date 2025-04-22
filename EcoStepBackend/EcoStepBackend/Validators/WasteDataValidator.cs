namespace EcoStepBackend.Validators;

public class WasteDataValidator : ISurveyDataValidator<WasteData>
{
    public void Validate(User user, WasteData data, double days)
    {
        var foodWasteKgDay = data.FoodWasteKg / days;
        user.FoodWasteCondition = SurveyValidationHelper
            .EvaluateCondition(foodWasteKgDay, WasteData.FoodWasteKgPerDay);
        
        var otherWasteKgDay = data.OtherWasteKg / days;
        user.OtherWasteCondition = SurveyValidationHelper
            .EvaluateCondition(otherWasteKgDay, WasteData.OtherWasteKgPerDay);
        
        var plasticWasteKgDay = data.PlasticWasteKg / days;
        user.PlasticWasteCondition = SurveyValidationHelper
            .EvaluateCondition(plasticWasteKgDay, WasteData.PlasticWasteKgPerDay);
        
        var glassWasteKgDay = data.GlassWasteKg / days;
        user.GlassWasteCondition = SurveyValidationHelper
            .EvaluateCondition(glassWasteKgDay, WasteData.GlassWasteKgPerDay);
        
        var paperWasteKgDay = data.PaperWasteKg / days;
        user.PaperWasteCondition = SurveyValidationHelper
            .EvaluateCondition(paperWasteKgDay, WasteData.PaperWasteKgPerDay);
        
        var metalWasteKgDay = data.MetalWasteKg / days;
        user.MetalWasteCondition = SurveyValidationHelper
            .EvaluateCondition(metalWasteKgDay, WasteData.MetalWasteKgPerDay);

        ValidateRecycledWaste(user, data, days);
    }
    
    private static void ValidateRecycledWaste(User user, WasteData data, double days)
    {
        var plasticRecycledPercentDay = data.PlasticRecycledPercent / days;
        user.PlasticRecycledCondition = SurveyValidationHelper
            .EvaluateCondition(100 - plasticRecycledPercentDay, WasteData.PlasticRecycledPercentPerDay);
        
        var glassRecycledPercentDay = data.GlassRecycledPercent / days;
        user.GlassRecycledCondition = SurveyValidationHelper
            .EvaluateCondition(100 - glassRecycledPercentDay, WasteData.GlassRecycledPercentPerDay);
        
        var paperRecycledPercentDay = data.PaperRecycledPercent / days;
        user.PaperRecycledCondition = SurveyValidationHelper
            .EvaluateCondition(100 - paperRecycledPercentDay, WasteData.PaperRecycledPercentPerDay);
        
        var metalRecycledPercentDay = data.MetalRecycledPercent / days;
        user.MetalRecycledCondition = SurveyValidationHelper
            .EvaluateCondition(100 - metalRecycledPercentDay, WasteData.MetalRecycledPercentPerDay);
    }
}
