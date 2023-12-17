using System;
using System.Drawing;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YoutubeViewerApi.Data;
using YoutubeViewerCore.Data;
using YoutubeViewerCore.Enums;

namespace YoutubeViewerApi.Services.Database
{
	public class DatabaseService
	{
        private readonly YoutubeViewerContext _context;

        public DatabaseService(YoutubeViewerContext context)
        {
            _context = context;
        }

        public async Task<bool> IsUserExist(string login)
        {
            return await _context.Users
                .AnyAsync(x => x.Login == login);
        }

        public async Task<User?> GetUser(string login, string password)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Login == login && x.Password == password);
        }

        public async Task AddUser(User newUser)
        {
            newUser.NickNameColor ??= GetRandomColor();

            newUser.Role = Role.OrdinaryUser;

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
        }

        private string GetRandomColor()
        {
            var random = new Random();
            return Color.FromArgb(random.Next(255), random.Next(255), random.Next(255)).ToString();
        }

        public async Task AddVideo(Video newVideo)
        {
            newVideo.User = await GetUserById(newVideo.AddedByUserId);

            await _context.Videos.AddAsync(newVideo);
            await _context.SaveChangesAsync();
        }

        public async Task AddSessionByVideo(Video newVideo)
        {
            await AddVideo(newVideo);

            var session = new Session
            {
                Date = newVideo.Date,
                Video = newVideo
            };

            await _context.Sessions.AddAsync(session);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Video>> GetUsersSubscribedVideo(int userId)
        {
            var videos = await _context.Subscriptions
                .Where(x => x.User.Id == userId)
                .Select(x => x.Video)
                .ToListAsync();

            return videos;
        }

        public async Task<IEnumerable<Video>> GetUsersAddedVideos(int userId)
        {
            var videos = await _context.Videos
                .Where(x => x.User.Id == userId)
                .ToListAsync();

            return videos;
        }

        public async Task<bool> IsUserAddedVideo(int videoId, int userId)
        {
            var video = await _context.Videos
                .FirstOrDefaultAsync(x => x.Id == videoId);

            if (video is null)
                return false;

            return video.User.Id == userId;
        }

        public async Task DeleteVideoById(int videoId)
        {
            var video = await _context.Videos
                .FirstOrDefaultAsync(x => x.Id == videoId);

            if (video is not null)
            {
                _context.Videos.Remove(video);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteSessionById(int sessionId)
        {
            var session = await _context.Sessions
                .FirstOrDefaultAsync(x => x.Id == sessionId);

            if (session is not null)
            {
                _context.Sessions.Remove(session);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateVideo(Video newVideoParams)
        {
            var oldVideo = await _context.Videos
                .FirstOrDefaultAsync(x => x.Id == newVideoParams.Id);

            if(oldVideo is not null)
            {
                oldVideo.Title = newVideoParams.Title;
                oldVideo.Date = newVideoParams.Date;
                oldVideo.Url = newVideoParams.Url;
            }
        }

        public async Task AddMessage(Message message)
        {
            await _context.Messages.AddAsync(message);
            await _context.SaveChangesAsync();
        }

        public async Task<Session> GetSessionById(int sessionId)
        {
            var session = await _context.Sessions
                .Include(x => x.Video)
                .Include(x => x.Video.User)
                .FirstOrDefaultAsync(x => x.Id == sessionId);

            return session ?? new Session();
        }

        public async Task<IEnumerable<Session>> GetSessionsByUserId(int userId)
        {
            var sessions = await _context.Sessions
                .Include(x => x.Video)
                .Include(x => x.Video.User)
                .Where(x => x.Video.User.Id == userId
                    && x.Date > DateTime.Now)
                .ToListAsync();

            return sessions;
        }

        public async Task<User> GetUserById(int userId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == userId);

            return user ?? new User();
        }

        public async Task<IEnumerable<Message>> GetMessages(int sessionId, int messagesCount = 50)
        {
            var messages = await _context.Messages
                .Include(x => x.Session)
                .Where(x => x.SessionId == sessionId)
                .Include(x => x.User)
                .Where(x => x.User.Role != Role.BannedUser)
                .Take(messagesCount)
                .ToListAsync();

            return messages;
        }

        public async Task DeleteMessageById(int messageId)
        {
            var message = await _context.Messages
                .FirstOrDefaultAsync(x => x.Id == messageId);

            if(message is not null)
            {
                _context.Messages.Remove(message);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Session>> GetFutureSessions()
        {
            var currentDate = DateTime.Now;

            var futureSessions = await _context.Sessions
                .Where(x => x.Date > currentDate)
                .Include(x => x.Video)
                .ToListAsync();

            return futureSessions;
        }

        public async Task AddVideoToUserSubscriptions(int videoId, int userId)
        {
            var video = await _context.Sessions
                .Include(x => x.Video)
                .FirstOrDefaultAsync(x => x.VideoId == videoId);

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == userId);

            if(video is not null && user is not null)
            {
                var subscription = new Subscription
                {
                    Video = video.Video,
                    User = user,
                };

                await _context.Subscriptions.AddAsync(subscription);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Video> GetVideoById(int videoId)
        {
            return await _context.Videos.FirstOrDefaultAsync(x => x.Id == videoId)
                ?? new Video();
        }

        public async Task<bool> IsUserSubscribedOnVideo(int videoId, int userId)
        {
            return await _context.Subscriptions
                .Where(x => x.VideoId == videoId)
                .AnyAsync(x => x.UserId == userId);
        }

        public async Task<IEnumerable<Subscription>> GetUserSubscribedVideos(int userId)
        {
            var subscribedVideos = await _context.Subscriptions
                .Where(x => x.UserId == userId)
                .Include(x => x.Video)
                .ToListAsync();

            return subscribedVideos;
        }

        public async Task DeleteVideoFromSubsById(int videoId, int userId)
        {
            var videoSub = await _context.Subscriptions
                .Where(x => x.UserId == userId)
                .FirstOrDefaultAsync(x => x.VideoId == videoId);

            _context.Subscriptions.Remove(videoSub!);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSessionDate(int sessionId, DateTime newDate)
        {
            var session = await _context.Sessions
                .FirstOrDefaultAsync(x => x.Id == sessionId);

            session!.Date = newDate;

            await _context.SaveChangesAsync();
        }

        public async Task BanUser(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            user!.Role = Role.BannedUser;

            BackgroundJob.Schedule(() => UnBanUser(userId), TimeSpan.FromSeconds(5));

            await _context.SaveChangesAsync();
        }

        public async Task UnBanUser(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            user!.Role = Role.OrdinaryUser;

            await _context.SaveChangesAsync();
        }

        public async Task MakeAdmin(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == userId);

            user!.Role = Role.Admin;

            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Video>> GetVideosByName(string name)
        {
            var videos = await _context.Videos
                .Where(x => x.Title.Contains(name))
                .ToListAsync();

            return videos;
        }
    }
}

