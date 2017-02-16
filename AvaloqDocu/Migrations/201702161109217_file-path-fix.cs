namespace AvaloqDocu.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class filepathfix : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FilePath",
                c => new
                    {
                        FilePathId = c.Int(nullable: false, identity: true),
                        FileName = c.String(),
                    })
                .PrimaryKey(t => t.FilePathId);
            
            AddColumn("dbo.Document", "Author", c => c.String());
            AddColumn("dbo.Document", "FilePathId", c => c.Int(nullable: false));
            AddColumn("dbo.Document", "CreationDate", c => c.DateTime(nullable: false));
            CreateIndex("dbo.Document", "FilePathId");
            AddForeignKey("dbo.Document", "FilePathId", "dbo.FilePath", "FilePathId", cascadeDelete: true);
            DropColumn("dbo.Document", "FilePath");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Document", "FilePath", c => c.String());
            DropForeignKey("dbo.Document", "FilePathId", "dbo.FilePath");
            DropIndex("dbo.Document", new[] { "FilePathId" });
            DropColumn("dbo.Document", "CreationDate");
            DropColumn("dbo.Document", "FilePathId");
            DropColumn("dbo.Document", "Author");
            DropTable("dbo.FilePath");
        }
    }
}
