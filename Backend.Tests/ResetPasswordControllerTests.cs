using Xunit;
using Moq;
using Backend.Controllers;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests.Controllers
{
    public class ResetPasswordControllerTests
    {
        [Fact]
        public async Task ResetPassword_WithValidData_ReturnsOk()
        {
            var options = new DbContextOptionsBuilder<appDB>()
                .UseInMemoryDatabase(databaseName: "ResetPasswordTestDB")
                .Options;

            var context = new appDB(options);
            context.Usuarios.Add(new Usuario
            {
                Correo = "user@example.com",
                Contrasena = "recovery-code",
                Nombre = "Test User"
            });
            await context.SaveChangesAsync();

            var emailServiceMock = new Mock<IEmailService>();

            var controller = new ResetPasswordController(emailServiceMock.Object, context);
            var resetRequest = new ResetPasswordRequest
            {
                Correo = "user@example.com",
                Codigo = "recovery-code",
                NuevaContrasena = "newpassword123"
            };

            var result = await controller.ResetPassword(resetRequest);

            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.Equal("Contraseña actualizada correctamente.", response.Message);
        }

        [Fact]
        public async Task ResetPassword_WithInvalidCode_ReturnsBadRequest()
        {
            var options = new DbContextOptionsBuilder<appDB>()
                .UseInMemoryDatabase(databaseName: "ResetPasswordTestDB")
                .Options;

            var context = new appDB(options);
            context.Usuarios.Add(new Usuario
            {
                Correo = "user@example.com",
                Contrasena = "recovery-code",
                Nombre = "Test User"
            });
            await context.SaveChangesAsync();

            var emailServiceMock = new Mock<IEmailService>();

            var controller = new ResetPasswordController(emailServiceMock.Object, context);
            var resetRequest = new ResetPasswordRequest
            {
                Correo = "user@example.com",
                Codigo = "wrong-code",
                NuevaContrasena = "newpassword123"
            };

            var result = await controller.ResetPassword(resetRequest);

            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<ApiResponse>(badRequestResult.Value);
            Assert.Equal("Código inválido o expirado.", response.Message);
        }
    }
}
