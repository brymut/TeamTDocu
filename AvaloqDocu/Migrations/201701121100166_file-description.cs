namespace AvaloqDocu.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class filedescription : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Document", "Description", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Document", "Description");
        }
    }
}
