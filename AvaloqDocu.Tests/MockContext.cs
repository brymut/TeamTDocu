using System.Data.Entity;
using AvaloqDocu.Models;
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
    }
}