using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Models.SessionModels
{
	public class MessageResponse
	{
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public string Date { get; set; } = null!;

        public User User { get; set; } = null!;
    }
}

