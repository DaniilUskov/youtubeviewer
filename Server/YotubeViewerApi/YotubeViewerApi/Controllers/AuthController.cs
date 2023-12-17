using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeViewerApi.Models.AuthModels;
using YoutubeViewerApi.Services;
using YoutubeViewerApi.Services.Database;
using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> _logger;

        private readonly IMapper _mapper;

        private readonly AuthentificationService _authentificationService;

        private readonly DatabaseService _databaseService;

        public AuthController(
            ILogger<AuthController> logger,
            AuthentificationService authentificationService,
            DatabaseService databaseService,
            IMapper mapper)
        {
            _logger = logger;
            _authentificationService = authentificationService;
            _databaseService = databaseService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<JsonResult> Login(AuthLoginRequest request)
        {
            var user = await _authentificationService.SignInUser(request);

            if (user is null)
                return new JsonResult(new
                {
                    status = 1,
                    message = "Неверный пользователь или пароль"
                });

            return new JsonResult(new
            {
                status = 0,
                token = user.Token,
                id = user.UserId,
                userName = user.Login,
                role = user.Role,
                avatarUrl = user.AvatarImageUrl,
                nickNameColor = user.NickNameColor
            });
        }

        [HttpPost]
        public async Task<JsonResult> Register(AuthRegisterRequest request)
        {
            if (await _databaseService.IsUserExist(request.Login))
                return new JsonResult(new
                {
                    status = 1,
                    message = "Пользователь уже существует"
                });

            await _databaseService.AddUser(_mapper.Map<User>(request));

            var user = await _authentificationService.SignInUser(_mapper.Map<AuthLoginRequest>(request));

            return new JsonResult(new
            {
                status = 0,
                token = user!.Token,
                id = user!.UserId,
                userName = user!.Login,
                role = user!.Role,
                avatarUrl = user.AvatarImageUrl,
                nickNameColor = user.NickNameColor
            });
        }

        [HttpGet]
        public async Task<User> Profile()
        {
            int userId = GetUserIdFromClaims();

            var user = await _databaseService.GetUserById(userId);

            return user;
        }

        private int GetUserIdFromClaims()
        {
            var userId = User.FindFirst("Id");

            if (userId is not null)
                return int.Parse(userId.Value);

            return 0;
        }
    }
}

