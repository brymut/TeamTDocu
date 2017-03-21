using AvaloqDocu.Models;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Rhino.Mocks;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AvaloqDocu.Tests.Services
{
    [TestClass()]
    public class ReportServiceTests
    {

        protected MockContext MockContext;
        protected IQueryable<Document> MockDocumentData;
        protected IDbSet<Document> MockDocumentSet;

        public void setUp()
        {
            MockContext = MockRepository.GenerateMock<MockContext>();

            MockDocumentSet = MockRepository.GenerateMock<IDbSet<Document>, IQueryable>();

            MockDocumentData = new List<Document>
            {
                new Document { Title = "kyle.pdf", SubType = "foo", DocuType = "meh", FunctionalArea = "java", Release = "1" },
                new Document { Title = "dafin.pdf", SubType = "foo", DocuType = "meh", Release = "1"  },
                new Document { Title = "david.pdf", DocuType = "meh", FunctionalArea = "java", Release = "1" },
                new Document { Title = "bryan.pdf", SubType = "foo", FunctionalArea = "java", Release = "1" },
                new Document { Title = "emily.pdf", SubType = "foo", DocuType = "bar", FunctionalArea = "java" }
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
        public void GetDocumentsMissingMetadataTest()
        {
            //Arrange
            setUp();

            //Act
            var a = new ReportService();
            SearchResultPTO result = a.GetDocumentsMissingMetadata();

            //Assert
            Assert.AreEqual(result.Results.Count(), 4);
            Assert.AreEqual(result.Total, 4);
        }
    }
}
