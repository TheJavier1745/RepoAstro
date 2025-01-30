namespace Backend.Models
{
        /// <summary>
        /// Representa un usuario dentro del sistema.
        /// </summary>
    public class Usuario
    {
        /// <summary>
        /// Identificador único del usuario.
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Tipo de usuario.
        /// </summary>
        public string TipoUsuario { get; set; } = string.Empty;
        /// <summary>
        /// Nombre del usuario.
        /// </summary>
        public string Nombre { get; set; } = string.Empty;
        /// <summary>
        /// Correo del usuario.
        /// </summary>
        public string Correo { get; set; } = string.Empty;
        /// <summary>
        /// Contraseña del usuario.
        /// </summary>
        public string Contrasena { get; set; } = string.Empty;
    }
}
