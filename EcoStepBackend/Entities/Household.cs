namespace EcoStepBackend;

public class Household
{
    public long UserId { get; set; }
    public HouseType HouseType { get; set; }
    public HeatingType HeatingType { get; set; }
    public int ResidentCount { get; set; }
}