using Xunit;
using Moq;
using Backend.Controllers;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class AdminControllerTests
{
    [Fact]
    public async Task GetMensajes_ReturnsOkWithMessages()
    {
        var mockDatoService = new Mock<IDatoService>();
        mockDatoService.Setup(service => service.GetAllDatosAsync())
            .ReturnsAsync(new List<Dato> { new Dato { Nombres = "Test" } });

        var options = new DbContextOptionsBuilder<appDB>()
            .UseInMemoryDatabase(databaseName: "AdminTestDB")
            .Options;

        var context = new appDB(options);
        var controller = new AdminController(mockDatoService.Object, context, new Mock<IEmailService>().Object);

        var result = await controller.GetMensajes();

        var okResult = Assert.IsType<OkObjectResult>(result);
        var response = Assert.IsAssignableFrom<IEnumerable<Dato>>(okResult.Value);
        Assert.Single(response);
    }
}
