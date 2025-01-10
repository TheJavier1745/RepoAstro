using Microsoft.AspNetCore.Mvc;
using MiProyectoAPI.Models;
using Microsoft.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class FormularioController : ControllerBase
{
    private readonly SqlConnection _dbConnection;

    public FormularioController(SqlConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    [HttpPost]
    public IActionResult GuardarMensaje([FromBody] Mensaje mensaje)
    {
        try
        {
            _dbConnection.Open();
            var query = "INSERT INTO datos (nombres, apellidos, rut, correo, telefono, mensaje) VALUES (@Nombre, @Apellido, @Rut, @Correo, @Telefono, @Mensaje)";
            using (var command = new SqlCommand(query, _dbConnection))
            {
                command.Parameters.AddWithValue("@Nombre", mensaje.Nombre);
                command.Parameters.AddWithValue("@Apellido", mensaje.Apellido);
                command.Parameters.AddWithValue("@Rut", mensaje.Rut);
                command.Parameters.AddWithValue("@Correo", mensaje.Correo);
                command.Parameters.AddWithValue("@Telefono", mensaje.Telefono);
                command.Parameters.AddWithValue("@Mensaje", mensaje.Texto);
                command.ExecuteNonQuery();
            }
            return Ok("Mensaje guardado correctamente.");
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
