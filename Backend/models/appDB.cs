using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    /// <summary>
    /// Representa el contexto de la base de datos de la aplicación.
    /// </summary>
    public class appDB : DbContext
    {
        /// <summary>
        /// Inicializa una nueva instancia del contexto de la base de datos.
        /// </summary>
        /// <param name="options">Opciones de configuración del contexto de la base de datos.</param>
        public appDB(DbContextOptions<appDB> options) : base(options) { }

        /// <summary>
        /// Tabla de datos del formulario de contacto.
        /// </summary>
        public DbSet<Dato> Datos { get; set; } = null!;

        /// <summary>
        /// Tabla de usuarios del sistema.
        /// </summary>
        public DbSet<Usuario> Usuarios { get; set; } = null!;

        /// <summary>
        /// Configura el mapeo entre las entidades y las tablas de la base de datos.
        /// </summary>
        /// <param name="modelBuilder">Constructor del modelo utilizado para definir las relaciones y propiedades.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración de la entidad Dato
            modelBuilder.Entity<Dato>(entity =>
            {
                entity.ToTable("datos"); 
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Nombres).HasColumnName("nombres");
                entity.Property(e => e.Apellidos).HasColumnName("apellidos");
                entity.Property(e => e.Rut).HasColumnName("rut");
                entity.Property(e => e.Correo).HasColumnName("correo");
                entity.Property(e => e.Telefono).HasColumnName("telefono");
                entity.Property(e => e.Mensaje).HasColumnName("mensaje");
                entity.Property(e => e.Fecha_Hora).HasColumnName("fecha_hora");
            });

            // Configuración de la entidad Usuario
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuarios"); 
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.TipoUsuario).HasColumnName("tipoUsuario");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.Correo).HasColumnName("correo");
                entity.Property(e => e.Contrasena).HasColumnName("contrasena");
            });
        }
    }
}
