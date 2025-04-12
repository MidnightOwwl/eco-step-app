namespace EcoStepBackend.Validators;

public class FoodDataValidator : ISurveyDataValidator<FoodData>
{
    public void Validate(User user, FoodData data, double days)
    {
        user.IsFoodMeatOk = data.MeatEatenKg / days < FoodData.MeatEatenKgPerDay;
        user.IsFoodPlantOk = data.PlantEatenKg / days < FoodData.PlantEatenKgPerDay;
    }
}
