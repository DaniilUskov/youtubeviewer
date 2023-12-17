using YoutubeViewerApi.Data;

namespace YoutubeViewerApi.Models.SessionModels
{
	public class SessionsResponse
	{
        public int Id { get; set; }

        public string Date { get; set; }

        public Video Video { get; set; } = null!;
    }
}

