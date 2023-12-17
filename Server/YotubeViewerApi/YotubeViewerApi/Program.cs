using AutoMapper;
using Hangfire;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using YoutubeViewerApi.Config;
using YoutubeViewerApi.Hubs;
using YoutubeViewerApi.Services;
using YoutubeViewerApi.Services.Database;
using YoutubeViewerCore.Data;

var builder = WebApplication.CreateBuilder(args);

var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MapperProfile());
});

IMapper mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();
builder.Services.AddHttpContextAccessor();

builder.Services.Configure<AuthConfig>(builder.Configuration.GetSection("Auth"));
var authConfig = builder.Configuration.GetSection("Auth").Get<AuthConfig>();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<YoutubeViewerContext>(options =>
{
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(10, 5, 15)));
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = authConfig.Issuer,
        ValidateAudience = true,
        ValidAudience = authConfig.Audience,
        ValidateLifetime = true,
        IssuerSigningKey = authConfig.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddHangfire(configuration => configuration
                .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
                .UseSimpleAssemblyNameTypeSerializer()
                .UseMemoryStorage());
builder.Services.AddHangfireServer();

builder.Services.AddScoped<DatabaseService>();
builder.Services.AddScoped<AuthentificationService>();

builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .WithOrigins("http://localhost:8000")
    .AllowCredentials());

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHangfireDashboard("/hangfire", new DashboardOptions
{

});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapHub<ChatHub>("/chat");

app.Run();

