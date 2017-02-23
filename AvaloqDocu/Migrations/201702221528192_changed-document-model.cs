namespace AvaloqDocu.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeddocumentmodel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Document", "FileSize", c => c.Int(nullable: false));
            DropColumn("dbo.Document", "Author");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Document", "Author", c => c.String());
            DropColumn("dbo.Document", "FileSize");
        }
    }
}
