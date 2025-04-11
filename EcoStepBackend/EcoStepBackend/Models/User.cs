namespace EcoStepBackend;

public class User
{
    public int Id { get; set; } 
    public string Name { get; set; } 
    public string Email { get; set; } 
    public string PasswordHash { get; set; } 
    public Household Household { get; set; } 
    public ICollection<Survey> Surveys { get; set; }
    
    public bool IsFoodMeatOk { get; set; }
    public bool IsFoodPlantOk { get; set; }
    public bool IsWaterOk { get; set; }
    public bool IsElectricityOk { get; set; }
    
    public bool IsCarPetrolOk { get; set; }
    public bool IsCarDieselOk { get; set; }
    public bool IsCarElectricOk { get; set; }
    public bool IsCarHybridOk { get; set; }
    public bool IsCarHydrogenOk { get; set; }
    public bool IsCarMethaneOk { get; set; }
    public bool IsCarPropaneOk { get; set; }
    
    public bool IsPublicTransportOk { get; set; }
    public bool IsAirplaneOk { get; set; }
    
    public bool IsFoodWasteOk { get; set; }
    public bool IsOtherWasteOk { get; set; }
    
    public bool IsPlasticWasteOk { get; set; }
    public bool IsGlassWasteOk { get; set; }
    public bool IsPaperWasteOk { get; set; }
    public bool IsMetalWasteOk { get; set; }
    
    public bool IsPlasticRecycledOk { get; set; }
    public bool IsGlassRecycledOk { get; set; }
    public bool IsPaperRecycledOk { get; set; }
    public bool IsMetalRecycledOk { get; set; }
}