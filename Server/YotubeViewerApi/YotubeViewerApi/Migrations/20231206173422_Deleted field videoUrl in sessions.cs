using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YoutubeViewerApi.Migrations
{
    public partial class DeletedfieldvideoUrlinsessions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VideoUrl",
                table: "Sessions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Date",
                table: "Sessions",
                type: "datetime(6)",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "Date",
                table: "Sessions",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddColumn<string>(
                name: "VideoUrl",
                table: "Sessions",
                type: "varchar(256)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
