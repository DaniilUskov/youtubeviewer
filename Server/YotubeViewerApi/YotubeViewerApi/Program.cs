using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using YoutubeViewerApi.Config;
using YoutubeViewerApi.Services;
using YoutubeViewerApi.Services.Database;
using YoutubeViewerCore.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var mappingConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new MapperProfile());
});

IMapper mapper = mappingConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<YoutubeViewerContext>(options =>
{
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(10, 5, 15)));
});

var authConfig = builder.Configuration.GetSection("Auth").Get<AuthConfig>();

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

builder.Services.AddScoped<DatabaseService>();
builder.Services.AddScoped<AuthentificationService>();

var app = builder.Build();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowAnyOrigin()
);

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

