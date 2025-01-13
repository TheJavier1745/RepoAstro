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
                          policy.WithOrigins("http://localhost:4321") 
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

//endpoint para agregar en el formulario
app.MapPost("/api/formularioAPI", async (HttpContext context, appDB db) =>
{
    try
    {
        // Leer los datos enviados en el cuerpo de la solicitud
        var data = await context.Request.ReadFromJsonAsync<Dato>();
        if (data == null)
            return Results.BadRequest(new { error = "Datos inválidos." });

        // Crear un nuevo registro basado en el modelo Dato
        var nuevoDato = new Dato
        {
            Nombres = data.Nombres,
            Apellidos = data.Apellidos,
            Rut = data.Rut,
            Correo = data.Correo,
            Telefono = data.Telefono,
            Mensaje = data.Mensaje,
            FechaHora = DateTime.Now // Se genera automáticamente
        };

        // Guardar en la base de datos
        db.Datos.Add(nuevoDato);
        await db.SaveChangesAsync();

        return Results.Ok(new { success = "Formulario enviado con éxito." });
    }
    catch (Exception ex)
    {
        Console.WriteLine("Error:", ex.Message);
        return Results.Problem("Ocurrió un error al guardar los datos.");
    }
});


app.Run();
