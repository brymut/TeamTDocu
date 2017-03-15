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
            //Arrange
            PackageService s = new PackageService();
            var name = "adifjfej23";

            //Act
            PackagePTO p = s.AddPackage(name);

            //Assert
            Assert.AreEqual(name, p.Name);
            Assert.AreEqual(p.NumberOfDocuments, 0);
            
            //Finish
            using (var dc = new DocuContext())
            {
                Assert.IsNotNull(dc.Packages.Find(name));
                dc.Packages.Remove(dc.Packages.Find(name));
                dc.SaveChanges();
            }
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