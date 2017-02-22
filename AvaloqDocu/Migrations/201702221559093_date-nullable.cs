namespace AvaloqDocu.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class datenullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Document", "UploadDate", c => c.DateTime());
            AlterColumn("dbo.Document", "CreationDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Document", "CreationDate", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Document", "UploadDate", c => c.DateTime(nullable: false));
        }
    }
}
