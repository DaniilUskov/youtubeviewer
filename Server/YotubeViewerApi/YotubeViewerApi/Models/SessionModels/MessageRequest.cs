using System;
namespace YoutubeViewerApi.Models.SessionModels
{
	public class MessageRequest
	{
		public string? Message { get; set; }

		public int UserId { get; set; }

		public int SessionId { get; set; }
	}
}

