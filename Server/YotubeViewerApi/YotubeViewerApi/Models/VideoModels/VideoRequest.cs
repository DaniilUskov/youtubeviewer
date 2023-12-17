using System;
namespace YoutubeViewerApi.Models.VideoModel
{
	public class VideoRequest
	{
		public int Id { get; set; }

		public string Title { get; set; } = null!;

		public string Url { get; set; } = null!;

        public DateTime Date { get; set; }

		public int AddedByUserId { get; set; }

    }
}

