using Backend.Repositories;
using Backend.Services;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<appDB>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    new MySqlServerVersion(new Version(8, 0, 32)))
);


builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IDatoService, DatoService>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IDatoRepository, DatoRepository>();
builder.Services.AddScoped<IPasswordRecoveryService, PasswordRecoveryService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<IReCaptchaService, ReCaptchaService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("Jwt:Key no configurada"))
            )
        };
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("_myAllowSpecificOrigins", policy =>
    {
        policy.WithOrigins("https://front.yourmetrics.cl")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API de Consultora AP",
        Version = "v1",
        Description = "API para administración y gestión de usuarios, formularios y autenticación.",
        Contact = new OpenApiContact
        {
            Name = "Consultora AP",
            Email = "consultoraap079@gmail.com",
            Url = new Uri("http://api.yourmetrics.cl/")
        }
    });

    c.AddServer(new OpenApiServer
    {
        Url = "http://api.yourmetrics.cl/",
        Description = "Servidor de desarrollo"
    });

    var xmlFilename = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();
app.UseCors("_myAllowSpecificOrigins");  
app.UseAuthentication();
app.UseAuthorization();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
    c.RoutePrefix = "swagger"; 
});
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204;
        context.Response.Headers.Add("Access-Control-Allow-Origin", "https://front.yourmetrics.cl");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        context.Response.Headers.Add("Access-Control-Allow-Credentials", "true");
        await context.Response.CompleteAsync();
        return;
    }
    await next();
});

app.MapGet("/", async context =>
{
    var html = @"
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>API en Línea</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .container { max-width: 600px; margin: auto; padding: 20px; background: #f4f4f4; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
            h1 { color: #2c3e50; }
            p { font-size: 18px; color: #333; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>✅ API en Línea</h1>
            <p>Bienvenido, la API está funcionando correctamente.</p>
        </div>
    </body>
    </html>";
    
    context.Response.ContentType = "text/html";
    await context.Response.WriteAsync(html);
});
app.MapControllers();
app.Run();
