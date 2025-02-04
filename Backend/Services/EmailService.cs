using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace Backend.Services
{
    public class EmailService:IEmailService
    {

    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

public async Task EnviarCorreo(string destinatario, string asunto, string contenido)
{
    if (string.IsNullOrEmpty(destinatario) || string.IsNullOrEmpty(asunto) || string.IsNullOrEmpty(contenido))
    {
        throw new ArgumentException("Los parámetros no pueden ser nulos o vacíos.");
    }

    var smtpHost = _configuration["Smtp:Host"];
    var smtpPort = int.Parse(_configuration["Smtp:Port"]);
    var smtpUser = _configuration["Smtp:Username"];
    var smtpPass = _configuration["Smtp:Password"];


    var client = new SmtpClient("smtp.gmail.com")
    {
        Port = 587,
        Credentials = new NetworkCredential("consultoraap079@gmail.com", "kbwf diyv qbfw qbvu"),
        EnableSsl = true,
    };

    var mail = new MailMessage
    {
        From = new MailAddress("consultoraap079@gmail.com"),
        Subject = asunto,
        Body = contenido,
        IsBodyHtml = true,
    };

    mail.To.Add(destinatario);

    client.Send(mail);
}

    }
}
