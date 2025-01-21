using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace Backend.Services
{
    public class EmailService
    {

        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

public async Task EnviarCorreo(string destinatario, string asunto, string contenido)
{
    if (string.IsNullOrEmpty(destinatario))
        throw new ArgumentException("El destinatario no puede ser nulo o vacío.", nameof(destinatario));
    if (string.IsNullOrEmpty(asunto))
        throw new ArgumentException("El asunto no puede ser nulo o vacío.", nameof(asunto));
    if (string.IsNullOrEmpty(contenido))
        throw new ArgumentException("El contenido no puede ser nulo o vacío.", nameof(contenido));


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
