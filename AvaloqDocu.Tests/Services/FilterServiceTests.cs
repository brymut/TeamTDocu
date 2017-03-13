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
            var f = new FilterService();
            var list = f.GetReleaseOptions();
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(ReleaseEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(ReleaseEnum), "Release33"));
        }

        [TestMethod()]
        public void GetFunctionalAreasTest()
        {
            var f = new FilterService();
            var list = f.GetFunctionalAreas();
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(FunctionalAreaEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(FunctionalAreaEnum), "AFPWebBanking"));
        }

        [TestMethod()]
        public void GetDocuTypesTest()
        {
            var f = new FilterService();
            var list = f.GetDocuTypes();
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(DocuTypeEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(DocuTypeEnum), "AvaloqTools"));
        }

        [TestMethod()]
        public void GetDocuSubtypesTest()
        {
            var f = new FilterService();
            var list = f.GetDocuSubtypes((int)DocuTypeEnum.AvaloqCore);
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(AvaloqCoreEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(AvaloqCoreEnum), "ConcDescript"));

            list = f.GetDocuSubtypes((int)DocuTypeEnum.AvaloqTools);
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(AvaloqToolsEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(AvaloqToolsEnum), "InstallGuide"));

            list = f.GetDocuSubtypes((int)DocuTypeEnum.AvalowFront);
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(AvaloqFrontEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(AvaloqFrontEnum), "NewFeatDesc"));

            list = f.GetDocuSubtypes((int)DocuTypeEnum.ReleaseInfo);
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(ReleaseInfoEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(ReleaseInfoEnum), "ADP"));

            list = f.GetDocuSubtypes((int)DocuTypeEnum.Support);
            Assert.AreEqual(list.Count(), Enum.GetNames(typeof(SupportEnum)).Length);
            Assert.IsTrue(Enum.IsDefined(typeof(SupportEnum), "BusUserGuide"));

            list = f.GetDocuSubtypes(-99);
            Assert.AreEqual(list.Count(), 0);
        }
    }
}