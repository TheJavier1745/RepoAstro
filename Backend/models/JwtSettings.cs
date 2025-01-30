namespace Backend.Models
{
    /// <summary>   
     /// Representa la configuración de JWT.
     /// </summary>
    public class JwtSettings
    {
        /// <summary>   
        /// Clave secreta para firmar los tokens.
        /// </summary>
        public string Key { get; set; } = string.Empty;
        /// <summary>
        /// Tiempo de expiración de los tokens en minutos.
        /// </summary>
        public string Issuer { get; set; } = string.Empty;
        /// <summary>
        /// Emisor de los tokens.
        /// </summary>
        public string Audience { get; set; } = string.Empty;
    }
}
