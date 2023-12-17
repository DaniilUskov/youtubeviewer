using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Data
{
	public class Subscription
	{
		[Key]
		public int Id { get; set; }

        [ForeignKey(nameof(Video))]
        public int VideoId { get; set; }

        public Video Video { get; set; } = null!;

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }

        public User User { get; set; } = null!;
    }
}

