using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using AvaloqDocu.Models;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace AvaloqDocu
{
    public class DocuContext : DbContext
    {
        public DocuContext() : base("name=DefaultConnection")
        {
        }

        public DbSet<Document> Documents { get; set; }
        public DbSet<Package> Packages { get; set; }
        public DbSet<PackageDocument> PackageDocuments { get; set; }
        public DbSet<FilePath> FilePaths { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}