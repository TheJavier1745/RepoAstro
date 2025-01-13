namespace Backend.Models
{
    public class Login
    {
        public int Id { get; set; }
        public string TipoUsuario { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Correo { get; set; } = string.Empty;
        public string Contrasena { get; set; } = string.Empty;
    }
}