namespace AvaloqDocu.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class documentmodelchanges : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Document", "Subtitle", c => c.String());
            AddColumn("dbo.Document", "DocuID", c => c.Int(nullable: false));
            AddColumn("dbo.Document", "Release", c => c.String());
            AddColumn("dbo.Document", "FunctionalArea", c => c.String());
            AddColumn("dbo.Document", "DocuType", c => c.String());
            AddColumn("dbo.Document", "SubType", c => c.String());
            AddColumn("dbo.Document", "LastModified", c => c.DateTime(nullable: false));
            DropColumn("dbo.Document", "Description");
            DropColumn("dbo.Document", "UploadDate");
            DropColumn("dbo.Document", "CreationDate");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Document", "CreationDate", c => c.DateTime());
            AddColumn("dbo.Document", "UploadDate", c => c.DateTime());
            AddColumn("dbo.Document", "Description", c => c.String());
            DropColumn("dbo.Document", "LastModified");
            DropColumn("dbo.Document", "SubType");
            DropColumn("dbo.Document", "DocuType");
            DropColumn("dbo.Document", "FunctionalArea");
            DropColumn("dbo.Document", "Release");
            DropColumn("dbo.Document", "DocuID");
            DropColumn("dbo.Document", "Subtitle");
        }
    }
}
