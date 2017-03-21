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
        public void UploadIndexTest()
        {
            // Arrange
            HomeController controller = new UploadController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
