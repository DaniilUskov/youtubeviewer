using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoutubeViewerCore.Data
{
	public class Session
    {
        [Key]
        public int Id { get; set; }

		[Column(TypeName = "varchar(256)")]
		public string VideoUrl { get; set; } = null!;

		public DateOnly Date { get; set; }
	}
}

