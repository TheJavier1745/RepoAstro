using Backend.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<appDB>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"), 
        new MySqlServerVersion(new Version(8, 0, 32)) 
    )
);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4321") // Puerto de Astro
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

var app = builder.Build();
app.UseCors(MyAllowSpecificOrigins);
app.MapGet("/api/mensajes", async (appDB context) =>
{
    var datos = await context.Datos
        .ToListAsync();

    return Results.Ok(datos);
});

// Configurar el endpoint para login
app.MapPost("/api/login", async (appDB context, Usuario loginRequest) =>
{
    if (string.IsNullOrEmpty(loginRequest.Correo) || string.IsNullOrEmpty(loginRequest.Contrasena))
    {
        return Results.Json(new { Message = "Todos los campos son obligatorios" }, statusCode: 400);
    }

    var user = await context.Usuarios
        .FirstOrDefaultAsync(u => u.Correo == loginRequest.Correo && u.Contrasena == loginRequest.Contrasena);

    if (user == null)
    {
        return Results.Json(new { Message = "Correo o contraseña inválidos" }, statusCode: 401);

    }

    return Results.Ok(new
    {
        Message = "Inicio de sesión exitoso",
        TipoUsuario = user.TipoUsuario,
        Nombre = user.Nombre
    });
});

app.Run();
