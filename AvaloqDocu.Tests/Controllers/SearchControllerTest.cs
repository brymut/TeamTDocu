using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu;
using AvaloqDocu.Controllers;

namespace AvaloqDocu.Tests.Controllers
{
    [TestClass]
    public class SearchControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            SearchController controller = new SearchController();

            // Act
            ViewResult result = controller.Index("finance") as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}