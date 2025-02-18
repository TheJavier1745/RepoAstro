using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class DefaultController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Aplicación en Línea");
    }
}
