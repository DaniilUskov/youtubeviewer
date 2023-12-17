using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using YoutubeViewerApi.Data;
using YoutubeViewerApi.Models.VideoModel;
using YoutubeViewerApi.Models.VideoModels;
using YoutubeViewerApi.Services.Database;

namespace YoutubeViewerApi.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class VideoController : Controller
    {
        private readonly IMapper _mapper;

        private readonly DatabaseService _databaseService;

        public VideoController(
            DatabaseService databaseService,
            IMapper mapper)
        {
            _databaseService = databaseService;
            _mapper = mapper;
        }

        [Authorize]
        [HttpPost]
        public async Task<JsonResult> AddVideo(VideoRequest request)
        {
            if(request is null)
                return new JsonResult(new { status = 1 });

            await _databaseService.AddVideo(_mapper.Map<Video>(request));

            return new JsonResult(new { status = 0 });
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<VideosResponse>> GetAllUsersSubscribedVideos()
        {
            var userId = GetUserIdFromClaims();

            var videos = await _databaseService.GetUsersSubscribedVideo(userId);

            var videosResponse = videos.Select(_mapper.Map<VideosResponse>);

            return videosResponse;
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<VideosResponse>> GetUsersAddedVideos()
        {
            var userId = GetUserIdFromClaims();

            var videos = await _databaseService.GetUsersAddedVideos(userId);

            var videosResponse = videos.Select(_mapper.Map<VideosResponse>);

            return videosResponse;
        }

        [Authorize]
        [HttpPost]
        public async Task<JsonResult> UpdateVideoParams(VideoRequest request)
        {
            var userId = GetUserIdFromClaims();

            if (await _databaseService.IsUserAddedVideo(request.Id, userId))
            {
                await _databaseService.UpdateVideo(_mapper.Map<Video>(request));
                return new JsonResult(new { status = 0 });
            }

            return new JsonResult(new { status = 1 });
        }

        [Authorize]
        [HttpPost]
        public async Task<JsonResult> AddVideoToUserSubscriptions(VideoIdRequest request)
        {
            var userId = GetUserIdFromClaims();

            if(await _databaseService.IsUserSubscribedOnVideo(request.Id, userId))
                return new JsonResult(new { status = 1 });

            await _databaseService.AddVideoToUserSubscriptions(request.Id, userId);

            return new JsonResult(new { status = 0 });
        }

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<SubscriptionsResponse>> GetUsersSubscribedVideos()
        {
            var userId = GetUserIdFromClaims();

            var videos = await _databaseService.GetUserSubscribedVideos(userId);

            var videosResponse = videos.Select(_mapper.Map<SubscriptionsResponse>);

            return videosResponse;
        }

        [Authorize]
        [HttpDelete]
        [Route("{id}")]
        public async Task<JsonResult> DeleteVideoFromSubs(int id)
        {
            var userId = GetUserIdFromClaims();

            await _databaseService.DeleteVideoFromSubsById(id, userId);

            return new JsonResult(new { status = 0 });
        }

        [Authorize]
        [HttpGet]
        [Route("{name}")]
        public async Task<IEnumerable<VideosResponse>> GetVideosByName(string name)
        {
            var userId = GetUserIdFromClaims();

            var videos = await _databaseService.GetVideosByName(name);

            var videosResponse = videos.Select(_mapper.Map<VideosResponse>);

            return videosResponse;
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

