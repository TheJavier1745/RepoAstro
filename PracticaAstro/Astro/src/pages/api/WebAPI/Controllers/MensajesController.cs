using Microsoft.AspNetCore.Mvc;
using MiProyectoAPI.Models;
using Microsoft.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class MensajesController : ControllerBase
{
    private readonly SqlConnection _dbConnection;

    public MensajesController(SqlConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    [HttpGet]
    public IActionResult ObtenerMensajes()
    {
        try
        {
            _dbConnection.Open();
            var query = "SELECT * FROM datos";
            using (var command = new SqlCommand(query, _dbConnection))
            {
                using (var reader = command.ExecuteReader())
                {
                    var mensajes = new List<Mensaje>();
                    while (reader.Read())
                    {
                        mensajes.Add(new Mensaje
                        {
                            Id = (int)reader["Id"],
                            Nombre = reader["Nombre"].ToString(),
                            Apellido = reader["Apellido"].ToString(),
                            Rut = reader["Rut"].ToString(),
                            Correo = reader["Correo"].ToString(),
                            Telefono = reader["Telefono"].ToString(),
                            Texto = reader["Mensaje"].ToString()
                        });
                    }
                    return Ok(mensajes);
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error: {ex.Message}");
        }
        finally
        {
            _dbConnection.Close();
        }
    }
}
