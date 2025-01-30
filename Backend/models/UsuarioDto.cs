namespace Backend.Models
{
    /// <summary>
    /// Representa un usuario dentro del sistema (este es para no mostrar la contraseña en la consulta).
    /// </summary>}
public class UsuarioDto
{
    /// <summary>
    /// Identificador único del usuario.
    /// </summary>
    public int Id { get; set; }
    /// <summary>
    /// Nombre del usuario.
    /// </summary>
    public string Nombre { get; set; }
    /// <summary>
    /// Correo del usuario.
    /// </summary>
    public string Correo { get; set; }
    /// <summary>
    /// Tipo de usuario.
    /// </summary>
    public string TipoUsuario { get; set; }

}
}