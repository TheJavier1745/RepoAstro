
namespace Backend.Models
{
    /// <summary>
    /// Representa la solicitud de reseteo de contraseña.
    /// </summary>
    public class ResetPasswordRequest
    {
        /// <summary>
        /// Correo del usuario que solicita el reseteo de contraseña.
        /// </summary>
        public string Correo { get; set; } 
        /// <summary>
        /// Código de verificación enviado al correo del usuario.
        /// </summary>
        public string Codigo { get; set; }  
        /// <summary>
        /// Nueva contraseña del usuario.
        /// </summary>
        public string NuevaContrasena { get; set; }  
    }
}
