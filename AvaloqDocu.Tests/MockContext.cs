using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AvaloqDocu.Models;
using System.Data.Entity.ModelConfiguration.Conventions;
namespace AvaloqDocu.Tests
{
    public class MockContext : DbContext
    {
        public MockContext() : base("name=DefaultConnection")
        {
        }

        public virtual IDbSet<Document> Documents { get; set; }
        public virtual IDbSet<Package> Packages { get; set; }
        public virtual IDbSet<PackageDocument> PackageDocuments { get; set; }
        public virtual IDbSet<FilePath> FilePaths { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}