using System;
using YoutubeViewerCore.Enums;

namespace YoutubeViewerApi.Models.AuthModels
{
	public class AuthLoginResponse
	{
        public int UserId { get; set; }

        public string Token { get; set; } = null!;

        public string Login { get; set; } = null!;

        public Role Role { get; set; }

        public string AvatarImageUrl { get; set; } = null!;

        public string NickNameColor { get; set; } = null!;
    }
}

