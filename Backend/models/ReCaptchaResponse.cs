using Newtonsoft.Json;
using System.Collections.Generic;

namespace Backend.Models
{
    /// <summary>
    /// Representa la respuesta de reCAPTCHA.
    /// </summary>
    public class ReCaptchaResponse
    {
        /// <summary>
        /// Indica si la validación de reCAPTCHA fue exitosa.
        /// </summary>
        [JsonProperty("success")]
        public bool Success { get; set; }

        /// <summary>
        /// Timestamp de la validación.
        /// </summary>
        [JsonProperty("challenge_ts")]
        public string ChallengeTs { get; set; }

        /// <summary>
        /// Hostname del sitio que solicitó la validación.
        /// </summary>
        [JsonProperty("hostname")]
        public string Hostname { get; set; }
        
        /// <summary>
        /// Lista de errores devueltos por el servidor de reCAPTCHA.
        /// </summary>
        [JsonProperty("error-codes")]
        public List<string> ErrorCodes { get; set; }
    }
}
