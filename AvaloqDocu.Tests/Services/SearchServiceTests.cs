using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Rhino.Mocks;
using AvaloqDocu.Models;
using AvaloqDocu.Tests;
using System.Data.Entity;
using AvaloqDocu.PresentationTransferObjects;

namespace AvaloqDocu.Services.Tests
{
    [TestClass()]
    public class SearchServiceTests
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
                new Document { Title = "kyle1.pdf", SubType = "foo" },
                new Document { Title = "kyle2.pdf", DocuType = "bar" },
                new Document { Title = "dafin.pdf", Subtitle = "kyle" },
                new Document { Title = "david.pdf", FunctionalArea = "foobar" },
                new Document { Title = "bryan.pdf", DocuType = "bar" },
                new Document { Title = "emily.pdf", SubType = "foo", FunctionalArea = "foobar" }
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
        public void FullTextSearchTest()
        {
            //Arrange
            setUp();

            //Act
            var u = new SearchService();
            var Repository = new DocuRepository(MockContext);
            SearchResultPTO result1 = u.FullTextSearch("kyle");
            SearchResultPTO result2 = u.FullTextSearch("robbie");

            //Assert
            Assert.AreEqual(result1.Results.Count(), 3);
            Assert.IsNotNull(Repository.GetDocumentByID(result1.Results.First().DocumentID));  

            Assert.AreEqual(result2.Results.Count(), 0);
        }

        [TestMethod()]
        public void FilterSearchTest()
        {
            //Arrange
            setUp();

            //Act
            var u = new SearchService();
            SearchResultPTO result1 = u.FilterSearch("kyle",1,10,true);
            SearchResultPTO result2 = u.FilterSearch("d", 1, 10, true,0,null,"foobar");
            SearchResultPTO result3 = u.FilterSearch("", 1, 10, false, 0, null, "foobar");
            SearchResultPTO result4 = u.FilterSearch("", 1, 10, false, 0, null, null,"bar");
            SearchResultPTO result5 = u.FilterSearch("", 1, 10, false, 0, null, null, "foo");

            //Assert
            Assert.AreEqual(result1.Results.Count(), 2);
            Assert.AreEqual(result2.Results.Count(), 1);
            Assert.AreEqual(result3.Results.Count(), 2);
            Assert.AreEqual(result4.Results.Count(), 2);
            Assert.AreEqual(result5.Results.Count(), 0);
        }
    }
}