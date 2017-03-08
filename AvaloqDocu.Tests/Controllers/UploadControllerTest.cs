using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu.Controllers;
using System.Web.Mvc;
using System.Web;
using System.Web.Routing;
using Rhino.Mocks;
using System.Collections.Generic;

namespace AvaloqDocu.Tests.Controllers
{
    [TestClass]
    public class UploadControllerTest
    {
        [TestMethod]
        public void UploadSingleFile()
        {
            // Arrange
            UploadController controller = new UploadController();
            var context = MockRepository.GenerateStub<HttpContextBase>();
            var request = MockRepository.GenerateStub<HttpRequestBase>();
            var singleFile = MockRepository.GenerateStub<HttpPostedFileBase>();
            var files = MockRepository.GenerateStub<HttpFileCollectionBase>();
            var fileKey = new List<string>() { "foo" };

            context.Stub(x => x.Request).Return(request);
            request.Stub(x => x.Files).Return(files);
            files.Stub(x => x.Count).Return(1);
            singleFile.Stub(x => x.FileName).Return("foo.png");

            controller.ControllerContext = new ControllerContext(context, new RouteData(), controller);

            // Act
            var result = controller.UploadFiles() as JsonResult;
            List<FileMetadata> resultFiles = result.Data as List<FileMetadata>;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(1,resultFiles.Count);
        }
    }
}
