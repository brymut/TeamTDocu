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
        protected IQueryable<Package> MockPackageData;
        protected IDbSet<Package> MockPackageSet;
        protected IQueryable<Document> MockDocumentData;
        protected IDbSet<Document> MockDocumentSet;
        protected IQueryable<PackageDocument> MockPDData;
        protected IDbSet<PackageDocument> MockPDSet;

        public void setUp()
        {
            MockContext = MockRepository.GenerateMock<MockContext>();

            MockPackageSet = MockRepository.GenerateMock<IDbSet<Package>, IQueryable>();
            MockPDSet = MockRepository.GenerateMock<IDbSet<PackageDocument>, IQueryable>();
            MockDocumentSet = MockRepository.GenerateMock<IDbSet<Document>, IQueryable>();

            MockPackageData = new List<Package> {}.AsQueryable();
            MockPackageSet.Stub(m => m.Provider).Return(MockPackageData.Provider);
            MockPackageSet.Stub(m => m.Expression).Return(MockPackageData.Expression);
            MockPackageSet.Stub(m => m.ElementType).Return(MockPackageData.ElementType);
            MockPackageSet.Stub(m => m.GetEnumerator()).Return(MockPackageData.GetEnumerator());
            MockContext.Stub(x => x.Packages).PropertyBehavior();
            MockContext.Packages = MockPackageSet;

            MockDocumentData = new List<Document> {
            new Document{Title = "Test Document", Subtitle = "A document as a test"},
            new Document{Title = "Test Document 2", Subtitle = "A document as a test"}
            }.AsQueryable();
            MockDocumentSet.Stub(m => m.Provider).Return(MockDocumentData.Provider);
            MockDocumentSet.Stub(m => m.Expression).Return(MockDocumentData.Expression);
            MockDocumentSet.Stub(m => m.ElementType).Return(MockDocumentData.ElementType);
            MockDocumentSet.Stub(m => m.GetEnumerator()).Return(MockDocumentData.GetEnumerator());
            MockContext.Stub(x => x.Documents).PropertyBehavior();
            MockContext.Documents = MockDocumentSet;

            MockPDData = new List<PackageDocument> {}.AsQueryable();
            MockPDSet.Stub(m => m.Provider).Return(MockPDData.Provider);
            MockPDSet.Stub(m => m.Expression).Return(MockPDData.Expression);
            MockPDSet.Stub(m => m.ElementType).Return(MockPDData.ElementType);
            MockPDSet.Stub(m => m.GetEnumerator()).Return(MockPDData.GetEnumerator());
            MockContext.Stub(x => x.PackageDocuments).PropertyBehavior();
            MockContext.PackageDocuments = MockPDSet;
        }


        [TestMethod()]
        public void AddPackageTest()
        {
            //Arrange
            setUp();
            PackageService s = new PackageService();
            var name = "adifjfej23";

            //Act
            PackagePTO p = s.AddPackage(name);

            //Assert
            Assert.AreEqual(name, p.Name);
            Assert.AreEqual(p.NumberOfDocuments, 0);

            var Repository = new DocuRepository(MockContext);
            IEnumerable<Package> result = Repository.GetPackages();
            Assert.AreEqual(result.Count(), 1);         
        }

        [TestMethod()]
        public void AddDocumentsToPackagesTest()
        {
            //Arrange
            setUp();
            PackageService s = new PackageService();

            //Act
            var Repository = new DocuRepository(MockContext);
            PackagePTO p = s.AddPackage("foo");
            PackagePTO p2 = s.AddPackage("bar");
            s.AddDocumentToPackage(Repository.GetDocumentByName("Test Document").DocumentID, p.PackageId);
            s.AddDocumentToPackage(Repository.GetDocumentByName("Test Document 2").DocumentID, p.PackageId);
            s.AddDocumentToPackage(Repository.GetDocumentByName("Test Document 2").DocumentID, p2.PackageId);

            //Assert
            Assert.AreEqual(p.NumberOfDocuments, 2);
            Assert.AreEqual(p.Documents.Count(), 2);
            Assert.AreEqual(Repository.GetPDs().Count(), 3);
            Assert.AreEqual(Repository.GetPDsByDocName("Test Document").Count(), 1);

            Assert.AreEqual(Repository.GetPDsByDocName("Test Document 2").Count(), 2);
        }
    }
}