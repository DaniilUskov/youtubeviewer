using Microsoft.EntityFrameworkCore;
using YoutubeViewerApi.Data;

namespace YoutubeViewerCore.Data
{
	public class YoutubeViewerContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Session> Sessions { get; set; }

        public virtual DbSet<Message> Messages { get; set; }

        public virtual DbSet<Video> Videos { get; set; }

        public virtual DbSet<Subscription> Subscriptions { get; set; }

        public YoutubeViewerContext(DbContextOptions<YoutubeViewerContext> options)
        : base(options)
        {
        }
    }
}

