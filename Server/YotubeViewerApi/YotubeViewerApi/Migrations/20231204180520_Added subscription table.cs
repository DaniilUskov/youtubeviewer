using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoutubeViewerApi.Migrations
{
    public partial class Addedsubscriptiontable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AddedByUserId",
                table: "Videos",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Videos_AddedByUserId",
                table: "Videos",
                column: "AddedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Videos_Users_AddedByUserId",
                table: "Videos",
                column: "AddedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Videos_Users_AddedByUserId",
                table: "Videos");

            migrationBuilder.DropIndex(
                name: "IX_Videos_AddedByUserId",
                table: "Videos");

            migrationBuilder.DropColumn(
                name: "AddedByUserId",
                table: "Videos");
        }
    }
}
