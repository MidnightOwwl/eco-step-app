namespace EcoStepBackend.Validators;

public class ResourceDataValidator : ISurveyDataValidator<ResourceData>
{
    public void Validate(User user, ResourceData data, double days)
    {
        var waterConsumptionDay = data.WaterConsumptionL / days;
        user.WaterCondition = SurveyValidationHelper
            .EvaluateCondition(waterConsumptionDay, ResourceData.WaterConsumptionLPerDay);

        var electricityConsumptionDay = data.ElectricityConsumptionKWtH / days;
        user.ElectricityCondition = SurveyValidationHelper
            .EvaluateCondition(electricityConsumptionDay, ResourceData.ElectricityConsumptionKWtHPerDay);
    }
}

