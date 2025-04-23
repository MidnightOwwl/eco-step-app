namespace EcoStepBackend.Validators;

public class TransportDataValidator : ISurveyDataValidator<TransportData>
{
    public void Validate(User user, TransportData data, double days)
    {
        var carPetrolKmDay = data.CarDistanceKmPetrol / days;
        user.CarPetrolCondition = SurveyValidationHelper
            .EvaluateCondition(carPetrolKmDay, TransportData.CarDistanceKmPetrolPerDay);
        
        var carDieselKmDay = data.CarDistanceKmDiesel / days;
        user.CarDieselCondition = SurveyValidationHelper
            .EvaluateCondition(carDieselKmDay, TransportData.CarDistanceKmDieselPerDay);
        
        var carElectricKmDay = data.CarDistanceKmElectric / days;
        user.CarElectricCondition = SurveyValidationHelper
            .EvaluateCondition(carElectricKmDay, TransportData.CarDistanceKmElectricPerDay);
        
        var carHybridKmDay = data.CarDistanceKmHybrid / days;
        user.CarHybridCondition = SurveyValidationHelper
            .EvaluateCondition(carHybridKmDay, TransportData.CarDistanceKmHybridPerDay);
        
        var carHydrogenKmDay = data.CarDistanceKmHydrogen / days;
        user.CarHydrogenCondition = SurveyValidationHelper
            .EvaluateCondition(carHydrogenKmDay, TransportData.CarDistanceKmHydrogenPerDay);
        
        var carMethaneKmDay = data.CarDistanceKmMethane / days;
        user.CarMethaneCondition = SurveyValidationHelper
            .EvaluateCondition(carMethaneKmDay, TransportData.CarDistanceKmMethanePerDay);
        
        var carPropaneKmDay = data.CarDistanceKmPropane / days;
        user.CarPropaneCondition = SurveyValidationHelper
            .EvaluateCondition(carPropaneKmDay, TransportData.CarDistanceKmPropanePerDay);
        
        ValidatePublicTransport(user, data, days);
    }
    
    private static void ValidatePublicTransport(User user, TransportData data, double days)
    {
        var publicTransportKmDay = data.PublicTransportDistanceKm / days;
        user.PublicTransportCondition = SurveyValidationHelper
            .EvaluateCondition(publicTransportKmDay, TransportData.PublicTransportDistanceKmPerDay);
        
        var trainKmDay = data.TrainDistanceKm / days;
        user.TrainCondition = SurveyValidationHelper
            .EvaluateCondition(trainKmDay, TransportData.TrainDistanceKmPerDay);

        var airplaneKmDay = data.AirplaneDistanceKm / days;
        user.AirplaneCondition = SurveyValidationHelper
            .EvaluateCondition(airplaneKmDay, TransportData.AirplaneDistanceKmPerDay);
    }
}
