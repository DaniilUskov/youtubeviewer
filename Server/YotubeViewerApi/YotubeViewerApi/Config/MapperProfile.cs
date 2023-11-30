using AutoMapper;
using YoutubeViewerApi.Models.AuthModels;
using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Config
{
	public class MapperProfile : Profile
    {
		public MapperProfile()
		{
			CreateMap<AuthRegisterRequest, User>();
			CreateMap<AuthRegisterRequest, AuthLoginRequest>();
		}
	}
}

