using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Models;
using System.Data.Entity;
using Rhino.Mocks;
using AvaloqDocu.Tests;

namespace AvaloqDocu.Services.Tests
{
    [TestClass()]
    public class PackageServiceTests
    {
        protected MockContext MockContext;
        protected IQueryable<Package> MockData;
        protected IDbSet<Package> MockSet;

        [TestMethod()]
        public void AddPackageTest()
        {
            //Arrange
            MockContext = MockRepository.GenerateMock<MockContext>();
            MockSet = MockRepository.GenerateMock<IDbSet<Package>, IQueryable>();
            MockData = new List<Package> { }.AsQueryable();
            MockSet.Stub(m => m.Provider).Return(MockData.Provider);
            MockSet.Stub(m => m.Expression).Return(MockData.Expression);
            MockSet.Stub(m => m.ElementType).Return(MockData.ElementType);
            MockSet.Stub(m => m.GetEnumerator()).Return(MockData.GetEnumerator());
            MockContext.Stub(x => x.Packages).PropertyBehavior();
            MockContext.Packages = MockSet;

            PackageService s = new PackageService();
            var name = "adifjfej23";

            //Act
            PackagePTO p = s.AddPackage(name);

            //Assert
            Assert.AreEqual(name, p.Name);
            Assert.AreEqual(p.NumberOfDocuments, 0);

            var pRepository = new PackageRepository(MockContext);
            IEnumerable<Package> result = pRepository.GetPackages();
            Assert.AreEqual(result.Count(), 1);         
        }

        [TestMethod()]
        public void AddDocumentToPackageTest()
        {
            using (var dc = new DocuContext())
            {
                //Arrange
                PackageService s = new PackageService();
                Models.Document d = new Models.Document();
                var name = "abcdefgh123";

                var testDocument = new Models.Document
                {
                    Title = "Test Document",
                    DocumentID = -1,
                    Subtitle = "A document as a test",
                };
                dc.Documents.Add(testDocument);
                dc.SaveChanges();
                //Act
                PackagePTO p = s.AddPackage(name);
                s.AddDocumentToPackage(testDocument.DocumentID, p.PackageId);

                //Assert
                Assert.AreEqual(p.NumberOfDocuments, 1);
                Assert.AreEqual(p.Documents.Count(), 1);
                Assert.AreEqual(p.Documents.ElementAt(0), testDocument);

                Assert.IsNotNull(dc.Documents.Find(testDocument.DocumentID));
                Assert.IsNotNull(dc.PackageDocuments.Find(p.PackageId, testDocument.DocumentID));

                //Finish
                dc.Documents.Remove(dc.Documents.Find(testDocument.DocumentID));
                dc.PackageDocuments.Remove(dc.PackageDocuments.Find(p.PackageId, testDocument.DocumentID));
                dc.SaveChanges();
            }
        }
    }

    public class PackageRepository
    {
        private MockContext Context;
        public PackageRepository(MockContext context)
        {
            Context = context;
        }

        public IEnumerable<Package> GetPackages()
        {
            return Context.Packages.ToList();
        }
    }   
}