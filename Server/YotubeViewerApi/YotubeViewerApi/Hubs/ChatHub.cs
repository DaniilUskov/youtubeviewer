using System;
using AutoMapper;
using Microsoft.AspNetCore.SignalR;
using YoutubeViewerApi.Models.SessionModels;
using YoutubeViewerApi.Services.Database;
using YoutubeViewerCore.Data;

namespace YoutubeViewerApi.Hubs
{
	public class ChatHub : Hub
    {
        private readonly DatabaseService _databaseService;

        private readonly IMapper _mapper;

        public ChatHub(DatabaseService databaseService,
            IMapper mapper)
		{
            _databaseService = databaseService;
            _mapper = mapper;
		}

        public async Task SendMessage(MessageRequest messageRequest)
        {
            var user = await _databaseService.GetUserById(messageRequest.UserId);
            var session = await _databaseService.GetSessionById(messageRequest.SessionId);

            var newMessage = new Message
            {
                User = user,
                Date = DateTime.Now,
                Text = messageRequest.Message ?? "",
                Session = session,
            };

            await _databaseService.AddMessage(newMessage);

            var mappedMessage = _mapper.Map<MessageResponse>(newMessage);

            await Clients.All.SendAsync("ReceiveMessage", mappedMessage);
        }

        public async Task StartVideo(bool isVideoPlaying, float currentTime)
        {
            await Clients.All.SendAsync("VideoStatus", isVideoPlaying, currentTime);
        }
    }
}

