namespace Backend.Services
{
    public interface IEmailService
    {
        Task EnviarCorreo(string destinatario, string asunto, string contenido);
    }
}
