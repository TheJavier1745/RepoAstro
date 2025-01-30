namespace Backend.Models
{
        /// <summary>
        /// Representa los datos enviados a través del formulario de contacto.
        /// </summary>
    public class Dato
    {
        /// <summary>
        /// Identificador único del dato. 
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Nombre del usuario que envía el mensaje.
        /// </summary>
        public string Nombres { get; set; } = string.Empty;
        /// <summary>
        /// Apellido del usuario que envía el mensaje.
        /// </summary>
        public string Apellidos { get; set; } = string.Empty;
        /// <summary>
        /// Rut del usuario que envía el mensaje.
        /// </summary>
        public string Rut { get; set; } = string.Empty;
        /// <summary>
        /// Correo del usuario que envía el mensaje.
        /// </summary>
        public string Correo { get; set; } = string.Empty;
        /// <summary>
        /// Teléfono del usuario que envía el mensaje.
        /// </summary>
        public string Telefono { get; set; } = string.Empty;
        /// <summary>
        /// Mensaje enviado por el usuario.
        /// </summary>
        public string Mensaje { get; set; } = string.Empty;
        /// <summary>
        /// Fecha y hora en que se envió el mensaje.
        /// </summary>
        public DateTime Fecha_Hora { get; set; }
    }
}
