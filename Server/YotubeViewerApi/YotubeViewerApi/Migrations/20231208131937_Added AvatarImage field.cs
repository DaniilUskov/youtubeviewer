using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoutubeViewerApi.Migrations
{
    public partial class AddedAvatarImagefield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarImageUrl",
                table: "Users",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarImageUrl",
                table: "Users");
        }
    }
}
