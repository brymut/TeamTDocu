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

namespace AvaloqDocu.Services.Tests
{
    [TestClass()]
    public class UploadServiceTests
    {
        [TestMethod()]
        public void UploadAndDeleteTest()
        {
            //Arrange

            var f = MockRepository.GenerateStub<HttpPostedFileBase>();
            f.Stub(x => x.FileName).Return("foo.bar");
            f.Stub(x => x.ContentLength).Return(100);

            //Act
            var u = new UploadService();
            u.Create(f);

            //Assert
            using (var dc = new DocuContext())
            {
                var a = dc.Documents.First(s => s.Title == "foo.bar");
                var b = a.DocumentID;
                Assert.IsNotNull(a);
                Assert.AreEqual(a.FileSize, 100);

                dc.Documents.Remove(dc.Documents.First(s => s.Title == "foo.bar"));
                Assert.IsNull(dc.Documents.Find(b));
            }
        }
    }
}