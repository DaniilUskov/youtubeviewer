using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YoutubeViewerCore.Data
{
	public class Message
	{
		[Key]
		public int Id { get; set; }

		[Column(TypeName = "TEXT")]
		public string Text { get; set; } = null!;

		public DateTime Date { get; set; }

		[ForeignKey(nameof(User))]
		public int UserId { get; set; }

		public User User { get; set; } = null!;

        [ForeignKey(nameof(Session))]
        public int SessionId { get; set; }

        public Session Session { get; set; } = null!;
    }
}

