using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IReCaptchaService
    {
        Task<bool> ValidateReCaptchaAsync(string recaptchaResponse);
    }
}
