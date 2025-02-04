using Xunit;
using Moq;
using Backend.Controllers;
using Backend.Services;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Tests.Controllers
{
    public class LoginControllerTests
    {
        [Fact]
public async Task Login_WithValidCredentials_ReturnsOkWithToken()
        {
            // Arrange
            var mockLoginService = new Mock<ILoginService>();
            mockLoginService.Setup(service => service.LoginAsync(It.IsAny<Usuario>()))
                .ReturnsAsync(new LoginResult
                {
                    Token = "fake-jwt-token",
                    TipoUsuario = "admin",
                    Nombre = "Test User"
                });

            var controller = new LoginController(mockLoginService.Object);
            var loginRequest = new Usuario { Correo = "test@correo.com", Contrasena = "password" };

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<LoginResult>(okResult.Value);
            Assert.Equal("admin", response.TipoUsuario);
            Assert.Equal("Test User", response.Nombre);
        }

        [Fact]
        public async Task Login_WithInvalidCredentials_ReturnsUnauthorized()
        {
            // Arrange
            var loginServiceMock = new Mock<ILoginService>();
            var loginRequest = new Usuario
            {
                Correo = "wronguser@example.com",
                Contrasena = "wrongpassword"
            };

            loginServiceMock.Setup(service => service.LoginAsync(loginRequest))
                .ReturnsAsync((LoginResult)null);

            var controller = new LoginController(loginServiceMock.Object);

            // Act
            var result = await controller.Login(loginRequest);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }
    }
}
