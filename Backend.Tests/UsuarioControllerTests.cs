using Xunit;
using Moq;
using Backend.Controllers;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Controllers
{
    public class UsuarioControllerTests
    {
        [Fact]
        public async Task ForgotPassword_WithValidEmail_ReturnsOk()
        {
            var options = new DbContextOptionsBuilder<appDB>()
                .UseInMemoryDatabase(databaseName: "ForgotPasswordTestDB")
                .Options;

            var context = new appDB(options);
            context.Usuarios.Add(new Usuario { Correo = "juan@example.com" });
            await context.SaveChangesAsync();

            var passwordRecoveryServiceMock = new Mock<IPasswordRecoveryService>();
            passwordRecoveryServiceMock.Setup(service => service.GenerateRecoveryCodeAsync("juan@example.com"))
                .ReturnsAsync("recovery-code");

            var controller = new UsuarioController(null, context, null, passwordRecoveryServiceMock.Object);
            var userRequest = new Usuario { Correo = "juan@example.com" };

            var result = await controller.ForgotPassword(userRequest);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.Equal("Código de recuperación enviado.", response.Message);
        }

        [Fact]
        public async Task ForgotPassword_WithInvalidEmail_ReturnsBadRequest()
        {
            var options = new DbContextOptionsBuilder<appDB>()
                .UseInMemoryDatabase(databaseName: "ForgotPasswordTestDB")
                .Options;
            var context = new appDB(options);

            var passwordRecoveryServiceMock = new Mock<IPasswordRecoveryService>();
            var controller = new UsuarioController(null, context, null, passwordRecoveryServiceMock.Object);
            var userRequest = new Usuario { Correo = "noexiste@example.com" };

            var result = await controller.ForgotPassword(userRequest);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<ApiResponse>(badRequestResult.Value);
            Assert.Equal("Correo no registrado.", response.Message);
        }
    }
}
