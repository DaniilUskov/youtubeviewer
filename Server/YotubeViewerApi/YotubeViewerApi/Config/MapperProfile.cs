using AutoMapper;
using YoutubeViewerApi.Data;
using YoutubeViewerApi.Models.AuthModels;
using YoutubeViewerApi.Models.SessionModels;
using YoutubeViewerApi.Models.VideoModel;
using YoutubeViewerApi.Models.VideoModels;
using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Config
{
	public class MapperProfile : Profile
    {
		public MapperProfile()
		{
			CreateMap<AuthRegisterRequest, User>();
			CreateMap<AuthRegisterRequest, AuthLoginRequest>();
			CreateMap<VideoRequest, Video>();
			CreateMap<Video, VideosResponse>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToString("dd/MM-HH:mm")));
            CreateMap<Message, MessageResponse>()
				.ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToString("HH:mm")));
			CreateMap<Session, SessionsResponse>()
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date.ToString("dd/MM-HH:mm")));
            CreateMap<Subscription, SubscriptionsResponse>()
			    .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
			    .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Video.Date.ToString("dd/MM-HH:mm")))
			    .ForMember(dest => dest.Video, opt => opt.MapFrom(src => src.Video));

        }
    }
}

