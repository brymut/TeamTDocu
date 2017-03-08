using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AvaloqDocu.ControllersAPI
{
    [RoutePrefix("api/package")]
    public class PackageController : ApiController
    {
        [HttpPost]
        [Route("PostNewPackage")]
        public void PostNewPackage(string name)
        {
            var ps = new PackageService();
            ps.AddPackage(name);
        }

        [HttpPost]
        [Route("PostDocumentToPackage")]
        public void PostDocumentToPackage(int documentId, int packageId)
        {
            var ps = new PackageService();
            ps.AddDocumentToPackage(documentId, packageId);
        }

        [HttpGet]
        [Route("GetPackages")]
        public PackageSearchPTO GetPackages(string query, int page = 0)
        {
            var ps = new PackageService();
            return ps.GetPackages(query, page);
        }
    }
}
