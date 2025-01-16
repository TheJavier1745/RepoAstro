using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class appDB : DbContext
    {
        public appDB(DbContextOptions<appDB> options) : base(options) { }

        public DbSet<Dato> Datos { get; set; } = null!;
        public DbSet<Usuario> Usuarios { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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
                entity.Property(e => e.FechaHora).HasColumnName("fecha_hora");
            });
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
