namespace EcoStepBackend.Validators;

public class TransportDataValidator : ISurveyDataValidator<TransportData>
{
    public void Validate(User user, TransportData data, double days)
    {
        user.IsCarPetrolOk = data.CarDistanceKmPetrol / days < TransportData.CarDistanceKmPetrolPerDay;
        user.IsCarDieselOk = data.CarDistanceKmDiesel / days < TransportData.CarDistanceKmDieselPerDay;
        user.IsCarElectricOk = data.CarDistanceKmElectric / days < TransportData.CarDistanceKmElectricPerDay;
        user.IsCarHybridOk = data.CarDistanceKmHybrid / days < TransportData.CarDistanceKmHybridPerDay;
        user.IsCarHydrogenOk = data.CarDistanceKmHydrogen / days < TransportData.CarDistanceKmHydrogenPerDay;
        user.IsCarMethaneOk = data.CarDistanceKmMethane / days < TransportData.CarDistanceKmMethanePerDay;
        user.IsCarPropaneOk = data.CarDistanceKmPropane / days < TransportData.CarDistanceKmPropanePerDay;
        
        user.IsPublicTransportOk = 
            data.PublicTransportDistanceKm / days < TransportData.PublicTransportDistanceKmPerDay;
        user.IsTrainOk = data.TrainDistanceKm / days < TransportData.TrainDistanceKmPerDay;
        user.IsAirplaneOk = data.AirplaneDistanceKm / days < TransportData.AirplaneDistanceKmPerDay;
    }
}
