using Xunit;
using Moq;
using Backend.Controllers;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Backend.Tests.Controllers
{
    public class ContactanosControllerTests
    {
        [Fact]
        public async Task EnviarMensaje_WithValidRecaptcha_ReturnsOk()
        {
            // Arrange
            var datoServiceMock = new Mock<IDatoService>();
            var emailServiceMock = new Mock<IEmailService>();
            var recaptchaServiceMock = new Mock<IReCaptchaService>();

            recaptchaServiceMock
                .Setup(service => service.ValidateReCaptchaAsync(It.IsAny<string>()))
                .ReturnsAsync(true);  // Simula un reCAPTCHA válido

            var controller = new ContactanosController(datoServiceMock.Object, emailServiceMock.Object, recaptchaServiceMock.Object);

            var dato = new Dato
            {
                Nombres = "Juan",
                Correo = "juan@example.com",
                Telefono = "123456789",
                Mensaje = "Mensaje de prueba."
            };

            datoServiceMock
                .Setup(service => service.AddDatoAsync(It.IsAny<Dato>()))
                .ReturnsAsync(true);

            emailServiceMock
                .Setup(service => service.EnviarCorreo(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>()))
                .Returns(Task.CompletedTask);

            // Act
            var result = await controller.EnviarMensaje(dato, "mocked-recaptcha");

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var response = Assert.IsType<ApiResponse>(okResult.Value);
            Assert.Equal("Mensaje enviado correctamente.", response.Message);
        }

        [Fact]
        public async Task EnviarMensaje_WithInvalidRecaptcha_ReturnsBadRequest()
        {
            // Arrange
            var datoServiceMock = new Mock<IDatoService>();
            var emailServiceMock = new Mock<IEmailService>();
            var recaptchaServiceMock = new Mock<IReCaptchaService>();

            recaptchaServiceMock
                .Setup(service => service.ValidateReCaptchaAsync(It.IsAny<string>()))
                .ReturnsAsync(false);  // Simula un reCAPTCHA inválido

            var controller = new ContactanosController(datoServiceMock.Object, emailServiceMock.Object, recaptchaServiceMock.Object);

            var dato = new Dato
            {
                Nombres = "Juan",
                Correo = "juan@example.com",
                Telefono = "123456789",
                Mensaje = "Mensaje de prueba."
            };

            // Act
            var result = await controller.EnviarMensaje(dato, "invalid-recaptcha");

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            var response = Assert.IsType<ApiResponse>(badRequestResult.Value);
            Assert.Equal("Verificación reCAPTCHA fallida. Por favor, intenta de nuevo.", response.Message);
        }
    }
}
