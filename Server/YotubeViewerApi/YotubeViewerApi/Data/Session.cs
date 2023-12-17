using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using YoutubeViewerApi.Data;

namespace YoutubeViewerCore.Data
{
	public class Session
    {
        [Key]
        public int Id { get; set; }

		public DateTime Date { get; set; }

        [ForeignKey(nameof(Video))]
        public int VideoId { get; set; }

        public Video Video { get; set; } = null!;
	}
}

