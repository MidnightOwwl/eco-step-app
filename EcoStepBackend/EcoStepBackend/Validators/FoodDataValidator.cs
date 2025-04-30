namespace EcoStepBackend.Validators;

public class FoodDataValidator : ISurveyDataValidator<FoodData>
{
    public void Validate(User user, FoodData data, double days)
    {
        var meatEatenOzDay = data.MeatEatenOz / days;
        user.FoodMeatCondition = SurveyValidationHelper
            .EvaluateCondition(meatEatenOzDay, FoodData.MeatEatenMaxOzDay);

        var plantEatenOzDay = data.PlantEatenOz / days;
        user.FoodPlantCondition = SurveyValidationHelper
            .EvaluateCondition(plantEatenOzDay, FoodData.PlantEatenMaxOzDay);
    }
}

