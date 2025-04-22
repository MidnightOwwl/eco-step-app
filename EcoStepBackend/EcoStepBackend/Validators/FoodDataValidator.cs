namespace EcoStepBackend.Validators;

public class FoodDataValidator : ISurveyDataValidator<FoodData>
{
    public void Validate(User user, FoodData data, double days)
    {
        var meatEatenKgDay = data.MeatEatenKg / days;
        user.FoodMeatCondition = SurveyValidationHelper
            .EvaluateCondition(meatEatenKgDay, FoodData.MeatEatenKgPerDay);

        var plantEatenKgDay = data.PlantEatenKg / days;
        user.FoodPlantCondition = SurveyValidationHelper
            .EvaluateCondition(plantEatenKgDay, FoodData.PlantEatenKgPerDay);
    }
}

