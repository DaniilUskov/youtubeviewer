using System;
using System.Drawing;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
        }

        private string GetRandomColor()
        {
            var random = new Random();
            return Color.FromArgb(random.Next(255), random.Next(255), random.Next(255)).ToString();
        }
    }
}

