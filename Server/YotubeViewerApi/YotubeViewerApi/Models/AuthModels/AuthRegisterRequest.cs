using System;
using YoutubeViewerCore.Enums;

namespace YoutubeViewerApi.Models.AuthModels
{
	public class AuthRegisterRequest
	{
        public string NickName { get; set; } = null!;

        public string Login { get; set; } = null!;

        public string Password { get; set; } = null!;

        public Role Role { get; set; }

        public string? NickNameColor { get; set; }
    }
}

