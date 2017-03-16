using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;
using AvaloqDocu.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Ionic.Zip;

namespace AvaloqDocu.ControllersAPI
{
    [RoutePrefix("api/package")]
    public class PackageController : ApiController
    {
        [HttpPost]
        [Route("PostNewPackage")]
        public int PostNewPackage(string name)
        {
            var ps = new PackageService();
            return ps.AddPackage(name);
        }

        [HttpPost]
        [Route("PostDocumentToPackage")]
        public void PostDocumentToPackage(int documentId, int packageId)
        {
            var ps = new PackageService();
            ps.AddDocumentToPackage(documentId, packageId);
        }

        [HttpPost]
        [Route("PostDocumentsToPackage")]
        public void PostDocumentsToPackage(AddDocumentsViewModel model)
        {
            var ps = new PackageService();
            foreach (var p in model.Documents)
            {
                ps.AddDocumentToPackage(p.DocumentID, model.PackageId);
            }
        }

        [HttpGet]
        [Route("GetPackages")]
        public PackageSearchPTO GetPackages(string query, int page = 0)
        {
            var ps = new PackageService();
            return ps.GetPackages(query, page);
        }

        [HttpGet]
        [Route("DownloadPackage")]
        public void DownloadPackage(int packageId/*, object sender, EventArgs e*/)
        {
            using (var dc = new DocuContext())
            {
                var package = dc.Packages.Find(packageId);
                System.Web.HttpContext c = System.Web.HttpContext.Current;
                c.Response.Clear();
                c.Response.BufferOutput = false; // false = stream immediately
                string archiveName = String.Format("{0}-{1}.zip",
                                                  package.Name,
                                                  DateTime.Now.ToString("yyyy-MMM-dd-HHmmss"));
                c.Response.ContentType = "application/zip";
                c.Response.AddHeader("content-disposition", "filename=" + archiveName);

                using (ZipFile zip = new ZipFile())
                {
                    var files = dc.PackageDocuments.Where(p => p.PackageId == packageId).Select(f => f.Document.FilePath.FileName).ToList().Select(s => System.Web.Hosting.HostingEnvironment.MapPath("~/UploadFiles/" + s));
                    zip.AddFiles(files);
                    zip.Save(c.Response.OutputStream);
                }
                c.Response.Close();
                c.ApplicationInstance.CompleteRequest();
            }
            
        }

    }
}
