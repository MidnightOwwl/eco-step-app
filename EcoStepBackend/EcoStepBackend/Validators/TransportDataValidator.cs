namespace EcoStepBackend.Validators;

public class TransportDataValidator : ISurveyDataValidator<TransportData>
{
    public void Validate(User user, TransportData data, double days)
    {
        var carPetrolMilesDay = data.CarDistanceMilesPetrol / days;
        user.CarPetrolCondition = SurveyValidationHelper
            .EvaluateCondition(carPetrolMilesDay, TransportData.CarDistancePetrolMaxMilesDay);
        
        var carDieselMilesDay = data.CarDistanceMilesDiesel / days;
        user.CarDieselCondition = SurveyValidationHelper
            .EvaluateCondition(carDieselMilesDay, TransportData.CarDistanceDieselMaxMilesDay);
        
        var carElectricMilesDay = data.CarDistanceMilesElectric / days;
        user.CarElectricCondition = SurveyValidationHelper
            .EvaluateCondition(carElectricMilesDay, TransportData.CarDistanceElectricMaxMilesDay);
        
        var carHybridMilesDay = data.CarDistanceMilesHybrid / days;
        user.CarHybridCondition = SurveyValidationHelper
            .EvaluateCondition(carHybridMilesDay, TransportData.CarDistanceHybridMaxMilesDay);
        
        var carHydrogenMilesDay = data.CarDistanceMilesHydrogen / days;
        user.CarHydrogenCondition = SurveyValidationHelper
            .EvaluateCondition(carHydrogenMilesDay, TransportData.CarDistanceHydrogenMaxMilesDay);
        
        var carMethaneMilesDay = data.CarDistanceMilesMethane / days;
        user.CarMethaneCondition = SurveyValidationHelper
            .EvaluateCondition(carMethaneMilesDay, TransportData.CarDistanceMethaneMaxMilesDay);
        
        var carPropaneMilesDay = data.CarDistanceMilesPropane / days;
        user.CarPropaneCondition = SurveyValidationHelper
            .EvaluateCondition(carPropaneMilesDay, TransportData.CarDistancePropaneMaxMilesDay);
        
        ValidatePublicTransport(user, data, days);
    }
    
    private static void ValidatePublicTransport(User user, TransportData data, double days)
    {
        var publicTransportMilesDay = data.PublicTransportDistanceMiles / days;
        user.PublicTransportCondition = SurveyValidationHelper
            .EvaluateCondition(publicTransportMilesDay, TransportData.PublicTransportDistanceMaxMilesDay);
        
        var trainMilesDay = data.TrainDistanceMiles / days;
        user.TrainCondition = SurveyValidationHelper
            .EvaluateCondition(trainMilesDay, TransportData.TrainDistanceMaxMilesDay);

        var airplaneMilesDay = data.AirplaneDistanceMiles / days;
        user.AirplaneCondition = SurveyValidationHelper
            .EvaluateCondition(airplaneMilesDay, TransportData.AirplaneDistanceMaxMilesDay);
    }
}
