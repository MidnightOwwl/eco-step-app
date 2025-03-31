namespace EcoStepBackend;

public class User
{
    public int Id { get; set; } 
    public string Name { get; set; } 
    public string Email { get; set; } 
    public string PasswordHash { get; set; } 
    public Household Household { get; set; } 
    public ICollection<Survey> Surveys { get; set; }
}