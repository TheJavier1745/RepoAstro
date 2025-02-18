namespace Backend.Models
{
    /// <summary>
    /// Representa la solicitud de cambio voluntario de contraseña.
    /// </summary>
    public class ChangePasswordRequest
    {
        /// <summary>
        /// Contraseña actual del usuario.
        /// </summary>
        public string CurrentPassword { get; set; } 
        /// <summary>
        /// Nueva contraseña del usuario.
        /// </summary>
        public string NewPassword { get; set; }  
    }
}