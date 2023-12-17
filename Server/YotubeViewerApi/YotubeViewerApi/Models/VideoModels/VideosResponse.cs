namespace YoutubeViewerApi.Models.VideoModel
{
	public class VideosResponse
	{
        public int Id { get; set; }

        public string Url { get; set; } = null!;

        public string Title { get; set; } = null!;

        public string Date { get; set; } = null!;
    }
}

