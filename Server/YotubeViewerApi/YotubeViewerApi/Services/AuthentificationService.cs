using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using YoutubeViewerApi.Config;
using YoutubeViewerCore.Data;
using YoutubeViewerApi.Services.Database;
using YoutubeViewerApi.Models.AuthModels;

namespace YoutubeViewerApi.Services
{
	public class AuthentificationService
    {
        private readonly IOptions<AuthConfig> _authConfig;

        private readonly IHttpContextAccessor _contextAccessor;

        private readonly DatabaseService _databaseService;

        public AuthentificationService(
            IOptions<AuthConfig> authConfig,
            DatabaseService databaseService,
            IHttpContextAccessor httpContextAccessor)
        {
            _authConfig = authConfig;
            _databaseService = databaseService;
            _contextAccessor = httpContextAccessor;
        }

        public async Task<AuthLoginResponse?> SignInUser(AuthLoginRequest request)
        {
            var user = await _databaseService.GetUser(request.Login, request.Password);

            if (user is not null)
            {
                return GetUserDto(user);
            }

            return null;
        }

        public bool IsSignedIn(ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                throw new ArgumentNullException(nameof(principal));
            }
            return principal?.Identities != null &&
                   principal.Identities.Any(i => i.AuthenticationType == JwtBearerDefaults.AuthenticationScheme);
        }

        public AuthLoginResponse GetUserDto(User user)
        {
            var identity = GetIdentity(user);
            var now = DateTime.UtcNow;

            var jwt = new JwtSecurityToken(
                    issuer: _authConfig.Value.Issuer,
                    audience: _authConfig.Value.Audience,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(_authConfig.Value.Lifetime)),
                    signingCredentials: new SigningCredentials(_authConfig.Value.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new AuthLoginResponse
            {
                UserId = user.Id,
                Login = user.Login,
                Role = user.Role,
                Token = encodedJwt,
                AvatarImageUrl = user.AvatarImageUrl,
                NickNameColor = user.NickNameColor!
            };

            return response;
        }

        private ClaimsIdentity GetIdentity(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("Id", user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, user.Role.ToString())
            };

            ClaimsIdentity claimsIdentity = new(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);

            return claimsIdentity;
        }
    }
}

