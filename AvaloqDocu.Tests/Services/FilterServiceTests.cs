using Microsoft.VisualStudio.TestTools.UnitTesting;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Enums;

namespace AvaloqDocu.Services.Tests
{
    [TestClass()]
    public class FilterServiceTests
    {
        [TestMethod()]
        public void GetReleaseOptionsTest()
        {
            // Arrange
            var f = new FilterService();

            //Act
            var list = f.GetReleaseOptions();

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(ReleaseEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(ReleaseEnum), "Release33"));
        }

        [TestMethod()]
        public void GetFunctionalAreasTest()
        {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetFunctionalAreas();

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(FunctionalAreaEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(FunctionalAreaEnum), "AFPWebBanking"));
        }

        [TestMethod()]
        public void GetDocuTypesTest()
        {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuTypes();

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(DocuTypeEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(DocuTypeEnum), "AvaloqTools"));
        }

        [TestMethod()]
        public void GetDocuSubtypeCoreTest()
        {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuSubtypes((int)DocuTypeEnum.AvaloqCore);

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(AvaloqCoreEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(AvaloqCoreEnum), "ConcDescript"));
        }

        [TestMethod()]
        public void GetDocuSubtypeToolsTest()
        {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuSubtypes((int)DocuTypeEnum.AvaloqTools);

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(AvaloqToolsEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(AvaloqToolsEnum), "InstallGuide"));
        }

        [TestMethod()]
        public void GetDocuSubtypeFrontTest()
        {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuSubtypes((int)DocuTypeEnum.AvalowFront);

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(AvaloqFrontEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(AvaloqFrontEnum), "NewFeatDesc"));
        }

        public void GetDocuSubtypeReleaseInfoTest() {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuSubtypes((int)DocuTypeEnum.ReleaseInfo);

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(ReleaseInfoEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(ReleaseInfoEnum), "ADP"));
        }

        public void GetDocuSubtypeSupportTest() {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuSubtypes((int)DocuTypeEnum.Support);

            //Assert
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(SupportEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(SupportEnum), "BusUserGuide"));
        }

        public void GetDocuSubtypeNullTest() {
            //Arrange
            var f = new FilterService();

            //Act
            var list = f.GetDocuSubtypes(-99);

            //Assert
            Assert.AreEqual(list.Count(), 0);
  
        }
    }
}