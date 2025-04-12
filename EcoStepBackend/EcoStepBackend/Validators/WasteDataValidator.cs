namespace EcoStepBackend.Validators;

public class WasteDataValidator : ISurveyDataValidator<WasteData>
{
    public void Validate(User user, WasteData data, double days)
    {
        user.IsFoodWasteOk = data.FoodWasteKg / days < WasteData.FoodWasteKgPerDay;
        user.IsOtherWasteOk = data.OtherWasteKg / days < WasteData.OtherWasteKgPerDay;
        user.IsPlasticWasteOk = data.PlasticWasteKg / days < WasteData.PlasticWasteKgPerDay;
        user.IsGlassWasteOk = data.GlassWasteKg / days < WasteData.GlassWasteKgPerDay;
        user.IsPaperWasteOk = data.PaperWasteKg / days < WasteData.PaperWasteKgPerDay;
        user.IsMetalWasteOk = data.MetalWasteKg / days < WasteData.MetalWasteKgPerDay;

        user.IsPlasticRecycledOk = data.PlasticRecycledPercent / days > WasteData.PlasticRecycledPercentPerDay;
        user.IsGlassRecycledOk = data.GlassRecycledPercent / days > WasteData.GlassRecycledPercentPerDay;
        user.IsPaperRecycledOk = data.PaperRecycledPercent / days > WasteData.PaperRecycledPercentPerDay;
        user.IsMetalRecycledOk = data.MetalRecycledPercent / days > WasteData.MetalRecycledPercentPerDay;
    }
}
