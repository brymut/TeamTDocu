namespace AvaloqDocu.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Document",
                c => new
                    {
                        DocumentId = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        FilePath = c.String(),
                        UploadDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.DocumentId);
            
            CreateTable(
                "dbo.PackageDocument",
                c => new
                    {
                        PackageId = c.Int(nullable: false),
                        DocumentId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PackageId, t.DocumentId })
                .ForeignKey("dbo.Document", t => t.DocumentId, cascadeDelete: true)
                .ForeignKey("dbo.Package", t => t.PackageId, cascadeDelete: true)
                .Index(t => t.PackageId)
                .Index(t => t.DocumentId);
            
            CreateTable(
                "dbo.Package",
                c => new
                    {
                        PackageId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.PackageId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.PackageDocument", "PackageId", "dbo.Package");
            DropForeignKey("dbo.PackageDocument", "DocumentId", "dbo.Document");
            DropIndex("dbo.PackageDocument", new[] { "DocumentId" });
            DropIndex("dbo.PackageDocument", new[] { "PackageId" });
            DropTable("dbo.Package");
            DropTable("dbo.PackageDocument");
            DropTable("dbo.Document");
        }
    }
}
