using YoutubeViewerApi.Data;
using YoutubeViewerApi.Models.VideoModel;

namespace YoutubeViewerApi.Models.VideoModels
{
	public class SubscriptionsResponse
	{
		public int Id { get; set; }

		public string Date { get; set; } = null!;

		public Video Video { get; set; } = null!;
	}
}

