using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Rhino.Mocks;
using System.Web;
using System.IO;
using AvaloqDocu.Tests;
using AvaloqDocu.Models;
using System.Data.Entity;

namespace AvaloqDocu.Services.Tests
{
    [TestClass()]
    public class UploadServiceTests
    {
        protected MockContext MockContext;
        protected IQueryable<Document> MockDocumentData;
        protected IDbSet<Document> MockDocumentSet;
        protected IQueryable<FilePath> MockFilePathData;
        protected IDbSet<FilePath> MockFilePathSet;

        public void setUp()
        {
            MockContext = MockRepository.GenerateMock<MockContext>();

            MockDocumentSet = MockRepository.GenerateMock<IDbSet<Document>, IQueryable>();
            MockFilePathSet = MockRepository.GenerateMock<IDbSet<FilePath>, IQueryable>();

            var filePath = new FilePath { FileName = "fileName/bar.foo" };
            MockFilePathData = new List<FilePath>
            {
                filePath
            }
            .AsQueryable();
            MockFilePathSet.Stub(m => m.Provider).Return(MockFilePathData.Provider);
            MockFilePathSet.Stub(m => m.Expression).Return(MockFilePathData.Expression);
            MockFilePathSet.Stub(m => m.ElementType).Return(MockFilePathData.ElementType);
            MockFilePathSet.Stub(m => m.GetEnumerator()).Return(MockFilePathData.GetEnumerator());
            MockContext.Stub(x => x.FilePaths).PropertyBehavior();
            MockContext.FilePaths = MockFilePathSet;

            MockDocumentData = new List<Document>
            {
                new Document { FilePath = filePath, Title = "bar.foo" }
            }
            .AsQueryable();
            MockDocumentSet.Stub(m => m.Provider).Return(MockDocumentData.Provider);
            MockDocumentSet.Stub(m => m.Expression).Return(MockDocumentData.Expression);
            MockDocumentSet.Stub(m => m.ElementType).Return(MockDocumentData.ElementType);
            MockDocumentSet.Stub(m => m.GetEnumerator()).Return(MockDocumentData.GetEnumerator());
            MockContext.Stub(x => x.Documents).PropertyBehavior();
            MockContext.Documents = MockDocumentSet;
        
        }

        [TestMethod()]
        public void UploadAndDeleteTest()
        {
            //Arrange
            setUp();
            var f = MockRepository.GenerateStub<HttpPostedFileBase>();
            f.Stub(x => x.FileName).Return("foo.bar");
            f.Stub(x => x.ContentLength).Return(100);

            //Act
            var u = new UploadService();
            u.Create(f);

            //Assert
            var Repository = new DocuRepository(MockContext);
            Assert.AreEqual(Repository.GetDocuments(), 2);
            Assert.AreEqual(Repository.GetDocumentByName("foo.bar"), 1);

            u.Delete("fileName/bar.foo");
            Assert.AreEqual(Repository.GetDocuments(), 1);
            Assert.AreEqual(Repository.GetDocumentByName("bar.foo"), 0);
        }
    }
}