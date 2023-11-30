using Microsoft.EntityFrameworkCore;

namespace YoutubeViewerCore.Data
{
	public class YoutubeViewerContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Session> Sessions { get; set; }

        public virtual DbSet<Message> Messages { get; set; }

        public YoutubeViewerContext(DbContextOptions<YoutubeViewerContext> options)
        : base(options)
        {
        }
    }
}

