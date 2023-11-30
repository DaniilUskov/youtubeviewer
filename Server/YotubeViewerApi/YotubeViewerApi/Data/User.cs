using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using YoutubeViewerCore.Enums;

namespace YoutubeViewerCore.Data
{
	public class User
	{
		[Key]
		public int Id { get; set; }

        [Column(TypeName = "varchar(64)")]
        public string NickName { get; set; } = null!;

        [Column(TypeName = "varchar(64)")]
        public string Login { get; set; } = null!;

        [Column(TypeName = "varchar(64)")]
        public string Password { get; set; } = null!;

		public Role Role { get; set; }
	}
}

