
namespace Backend.Models
{
    public class ResetPasswordRequest
    {
        public string Correo { get; set; } 
        public string Codigo { get; set; }  
        public string NuevaContrasena { get; set; }  
    }
}
