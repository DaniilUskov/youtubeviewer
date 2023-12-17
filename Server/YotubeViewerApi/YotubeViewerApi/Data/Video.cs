using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Data
{
	public class Video
	{
		[Key]
		public int Id { get; set; }

        [Column(TypeName = "varchar(256)")]
        public string Url { get; set; } = null!;

        [Column(TypeName = "varchar(128)")]
        public string Title { get; set; } = null!;

        public DateTime Date { get; set; }

        [ForeignKey(nameof(User))]
        public int AddedByUserId { get; set; }

        public User User { get; set; } = null!;
    }
}

