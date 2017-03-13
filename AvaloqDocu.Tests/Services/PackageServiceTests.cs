using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AvaloqDocu.PresentationTransferObjects;

namespace AvaloqDocu.Services.Tests
{
    [TestClass()]
    public class PackageServiceTests
    {
        [TestMethod()]
        public void AddPackageTest()
        {
            PackageService s = new PackageService();
            var name = "foo";
            PackagePTO p = s.AddPackage(name);
            Assert.AreEqual(name, p.Name);
            Assert.AreEqual(p.NumberOfDocuments, 0);
        }

        [TestMethod()]
        public void AddDocumentToPackageTest()
        {
            PackageService s = new PackageService();
            Models.Document d = new Models.Document();
            var name = "foo";

            var testDocument = new Models.Document
                {
                    Title = "Test Document",
                    DocumentID = -1,
                    Subtitle = "A document as a test",
                };

            PackagePTO p = s.AddPackage(name);
            s.AddDocumentToPackage(testDocument.DocumentID, p.PackageId);
            Assert.AreEqual(p.NumberOfDocuments, 1);
            Assert.AreEqual(p.Documents.Count(), 1);
            Assert.AreEqual(p.Documents.ElementAt(0), testDocument);

        }
    }
}