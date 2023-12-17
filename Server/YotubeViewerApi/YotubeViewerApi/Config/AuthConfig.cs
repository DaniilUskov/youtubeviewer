using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace YoutubeViewerApi.Config
{
    public class AuthConfig
    {
        public string Issuer { get; set; }

        public string Audience { get; set; }

        public string Key { get; set; }

        public int Lifetime { get; set; }

        public SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));
        }
    }
}
