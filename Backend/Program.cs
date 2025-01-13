using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Backend.Models;

// Configuración de servicios
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<appDB>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 32))
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("_myAllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("http://localhost:4321")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddAuthentication("Bearer").AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
            builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no está configurada.")
        ))
    };
});
builder.Services.AddAuthorization();
var app = builder.Build();
app.UseCors("_myAllowSpecificOrigins");
app.UseAuthentication(); 
app.UseAuthorization(); 

// Endpoint para login
app.MapPost("/api/login", async (appDB context, Usuario loginRequest) =>
{
    var user = await context.Usuarios
        .FirstOrDefaultAsync(u => u.Correo.Trim() == loginRequest.Correo.Trim() &&
                                  u.Contrasena.Trim() == loginRequest.Contrasena.Trim());

    if (user == null)
    {
        return Results.Json(new { Message = "Correo o contraseña inválidos" }, statusCode: 401);
    }

    var claims = new[]
    {
        new Claim(ClaimTypes.Name, user.Nombre),
        new Claim(ClaimTypes.Role, user.TipoUsuario),
        new Claim("Correo", user.Correo)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
        builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no está configurada.")
    ));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        issuer: builder.Configuration["Jwt:Issuer"],
        audience: builder.Configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.Now.AddHours(1),
        signingCredentials: creds
    );
     Console.WriteLine($"Token generado: {token}");
    return Results.Ok(new
    {
        Message = "Inicio de sesión exitoso",
        Token = new JwtSecurityTokenHandler().WriteToken(token),
        TipoUsuario = user.TipoUsuario,
        Nombre = user.Nombre
    });
});

app.MapPost("/api/validateToken", async (HttpContext context) =>
{
    var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
    var jwtKey = builder.Configuration["Jwt:Key"];
    if (string.IsNullOrEmpty(jwtKey))
    {
        return Results.Json(new { Message = "Configuración de token inválida." }, statusCode: 500);
    }

    try
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(jwtKey);

        var validationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateLifetime = true
        };

        tokenHandler.ValidateToken(token, validationParameters, out _);
        return Results.Ok(new { message = "Token válido" });
    }
    catch (Exception)
    {
        return Results.Json(new { message = "Token inválido o expirado." }, statusCode: 401);
    }
});
app.MapGet("/api/mensajes", async (appDB context) =>
{
    try
    {
        var datos = await context.Datos
            .Select(d => new
            {
                d.Id,
                d.Nombres,
                d.Correo,
                d.Mensaje,
                FechaHora = d.FechaHora.ToString("yyyy-MM-ddTHH:mm:ss")
            })
            .ToListAsync();

        return Results.Ok(datos);
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error al obtener los mensajes:", ex.Message);
        return Results.Json(new { message = "Error al obtener los mensajes del servidor." }, statusCode: 500);
    }
});


app.Run();
