using System.Text;
using EcoStepBackend.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;

namespace EcoStepBackend;

internal static class Program
{
    private static WebApplicationBuilder _builder = null!;
    
    public static void Main(string[] args)
    {
        _builder = WebApplication.CreateBuilder(args);
        
        BuildAuth();
        BuildServices();
        RunApp();
    }

    private static void BuildAuth()
    {
        var configuration = _builder.Configuration;

        _builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            var jwtKey = configuration["Jwt:Key"];
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = configuration["Jwt:Issuer"],
                ValidAudience = configuration["Jwt:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
            };
        });
    }
    
    private static void BuildServices()
    {
        // TODO: разобраться с AllowAnyHeader, AllowAnyMethod - небезопасно
        // TODO: понять, надо ли CORS нам вообще
        
        _builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins("http://localhost:3000")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
            });
        });
        
        _builder.Services.AddControllers();
        _builder.Services.AddEndpointsApiExplorer();
        _builder.Services.AddSwaggerGen();
        BuildValidators();
    }

    private static void BuildValidators()
    {
        _builder.Services.AddScoped<ISurveyDataValidator<FoodData>, FoodDataValidator>();
        _builder.Services.AddScoped<ISurveyDataValidator<ResourceData>, ResourceDataValidator>();
        _builder.Services.AddScoped<ISurveyDataValidator<TransportData>, TransportDataValidator>();
        _builder.Services.AddScoped<ISurveyDataValidator<WasteData>, WasteDataValidator>();
    }
    
    private static void RunApp()
    {
        var app = _builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        
        // TODO: разобраться с CORS
        app.UseCors();
        
        app.MapGet("/", () => "Приложение запущено");
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();
        app.Run();
    }
}