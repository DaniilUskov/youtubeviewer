using System;
namespace YoutubeViewerApi.Models.AuthModels
{
	public class AuthLoginRequest
	{
        public string Login { get; set; } = null!;

        public string Password { get; set; } = null!;
    }
}

