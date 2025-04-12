namespace EcoStepBackend.Validators;

public class ResourceDataValidator : ISurveyDataValidator<ResourceData>
{
    public void Validate(User user, ResourceData data, double days)
    {
        user.IsWaterOk = data.WaterConsumptionL / days < ResourceData.WaterConsumptionLPerDay;
        user.IsElectricityOk = data.ElectricityConsumptionKWtH / days < ResourceData.ElectricityConsumptionKWtHPerDay;
    }
}
