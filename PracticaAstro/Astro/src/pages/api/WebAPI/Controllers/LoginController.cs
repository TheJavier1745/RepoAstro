using Microsoft.AspNetCore.Mvc;
using MiProyectoAPI.Models;
using Microsoft.Data.SqlClient;

[ApiController]
[Route("api/[controller]")]
public class LoginController : ControllerBase
{
    private readonly SqlConnection _dbConnection;

    public LoginController(SqlConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    [HttpPost]
    public IActionResult ValidarUsuario([FromBody] LoginRequest request)
    {
        try
        {
            _dbConnection.Open();
            var query = "SELECT tipoUsuario FROM usuarios WHERE correo = @Correo AND contrasena = @Clave";
            using (var command = new SqlCommand(query, _dbConnection))
            {
                command.Parameters.AddWithValue("@Correo", request.Correo);
                command.Parameters.AddWithValue("@Clave", request.Clave);

                var tipoUsuario = command.ExecuteScalar() as string;

                if (string.IsNullOrEmpty(tipoUsuario))
                    return Unauthorized("Correo o clave incorrectos.");

                return Ok(new { success = true, tipoUsuario });
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
