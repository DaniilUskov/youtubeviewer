using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoutubeViewerApi.Data;
using YoutubeViewerApi.Models.SessionModels;
using YoutubeViewerApi.Models.VideoModel;
using YoutubeViewerApi.Services.Database;

namespace YoutubeViewerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SessionController : Controller
    {
        private readonly IMapper _mapper;

        private readonly DatabaseService _databaseService;

        public SessionController(IMapper mapper, DatabaseService databaseService)
        {
            _mapper = mapper;
            _databaseService = databaseService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IEnumerable<MessageResponse>> GetSessionLastMessagesbyId(int id)
        {
            var messages = await _databaseService.GetMessages(id);

            return messages.Select(_mapper.Map<MessageResponse>);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<JsonResult> DeleteMessageById(int id)
        {
            await _databaseService.DeleteMessageById(id);

            return new JsonResult(new { status = 0 });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<JsonResult> DeleteSessionById(int sessionId)
        {
            var userId = GetUserIdFromClaims();

            if (await _databaseService.IsUserAddedVideo(sessionId, userId))
            {
                await _databaseService.DeleteSessionById(sessionId);
                return new JsonResult(new { status = 0 });
            }

            return new JsonResult(new { status = 1 });
        }

        [HttpGet]
        public async Task<IEnumerable<SessionsResponse>> GetAllFutureSessions()
        {
            var futureSessions = await _databaseService.GetFutureSessions();

            return futureSessions.Select(_mapper.Map<SessionsResponse>);
        }

        [Authorize]
        [HttpPost]
        public async Task<JsonResult> PlanSession(VideoRequest request)
        {
            if (request is null)
                return new JsonResult(new { status = 1 });

            await _databaseService.AddSessionByVideo(_mapper.Map<Video>(request));

            return new JsonResult(new { status = 0 });
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<SessionsResponse> GetSessionById(int id)
        {
            var futureSession = await _databaseService.GetSessionById(id);

            return _mapper.Map<SessionsResponse>(futureSession);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IEnumerable<SessionsResponse>> GetSessionsByUserId(int id)
        {
            var userPlanedSessions = await _databaseService.GetSessionsByUserId(id);

            return userPlanedSessions.Select(_mapper.Map<SessionsResponse>);
        }

        [HttpPost]
        public async Task<JsonResult> UpdateSessionDate(UpdateSessionDateRequest request)
        {
            await _databaseService.UpdateSessionDate(request.Id, request.Date);

            return new JsonResult(new {status = 0});
        }

        [HttpPost]
        public async Task<JsonResult> BanUserById(UserIdRequest request)
        {
            await _databaseService.BanUser(request.Id);

            return new JsonResult(new { status = 0 });
        }

        [HttpPost]
        public async Task<JsonResult> MakeUserAdminById(UserIdRequest request)
        {
            await _databaseService.MakeAdmin(request.Id);

            return new JsonResult(new { status = 0 });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<JsonResult> DeleteMessageFromChat(int id)
        {
            await _databaseService.DeleteMessageById(id);

            return new JsonResult(new { status = 0 });
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

