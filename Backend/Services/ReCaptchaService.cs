using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.Services
{
    public class ReCaptchaService : IReCaptchaService
    {
        private const string GoogleReCaptchaVerifyUrl = "https://www.google.com/recaptcha/api/siteverify";
        private readonly string _secretKey = "6LeZ38QqAAAAAJITAfI5eeUPQbR_qvFZinFkOFiU";

        public async Task<bool> ValidateReCaptchaAsync(string recaptchaResponse)
        {
            using var client = new HttpClient();
            var content = new StringContent($"secret={_secretKey}&response={recaptchaResponse}", Encoding.UTF8, "application/x-www-form-urlencoded");
            var result = await client.PostAsync(GoogleReCaptchaVerifyUrl, content);
            var resultContent = await result.Content.ReadAsStringAsync();

            var reCaptchaResponse = JsonConvert.DeserializeObject<ReCaptchaResponse>(resultContent);
            return reCaptchaResponse?.Success ?? false;
        }
    }
}
