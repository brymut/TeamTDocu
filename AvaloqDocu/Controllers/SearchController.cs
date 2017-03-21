using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AvaloqDocu.Models;
using System.IO;
using Ionic.Zip;

namespace AvaloqDocu.Controllers
{
    public class SearchController : Controller
    {
        public ActionResult Index(string query)
        {
            return View();
        }

        public ActionResult DownloadPackageAsZip(int packageId)
        {
            using (var dc = new DocuContext())
            {
                var package = dc.Packages.Find(packageId);
                string archiveName = String.Format("{0}-{1}.zip",
                                                    package.Name,
                                                    DateTime.Now.ToString("dd-MM-yyyy"));
                var memoryStream = new MemoryStream();
                using (var zip = new ZipFile())
                {
                    var files = dc.PackageDocuments.Where(p => p.PackageId == packageId).Select(f => f.Document.FilePath.FileName).ToList().Select(s => Server.MapPath("~/UploadFiles/" + s));
                    zip.AddFiles(files, "");
                    //zip.Save(memoryStream);
                    var saveToFilePath = Server.MapPath("~/ExportFiles/" + package.Name + ".zip");
                    zip.Save(saveToFilePath);
                    return File(saveToFilePath, "application/zip", archiveName);
                    //return File(memoryStream, "application/zip", archiveName);
                }

            }

            //using (var dc = new DocuContext())
            //{
            //    var package = dc.Packages.Find(packageId);
            //    System.Web.HttpContext c = System.Web.HttpContext.Current;
            //    c.Response.Clear();
            //    c.Response.BufferOutput = false; // false = stream immediately
            //    string archiveName = String.Format("{0}-{1}.zip",
            //                                      package.Name,
            //                                      DateTime.Now.ToString("yyyy-MMM-dd-HHmmss"));
            //    c.Response.ContentType = "application/zip";
            //    c.Response.AddHeader("content-disposition", "filename=" + archiveName);

            //    using (ZipFile zip = new ZipFile())
            //    {
            //        var files = dc.PackageDocuments.Where(p => p.PackageId == packageId).Select(f => f.Document.FilePath.FileName).ToList().Select(s => System.Web.Hosting.HostingEnvironment.MapPath("~/UploadFiles/" + s));
            //        zip.AddFiles(files);
            //        zip.Save(c.Response.OutputStream);
            //    }
            //    c.Response.Close();
            //    c.ApplicationInstance.CompleteRequest();
            //}
        }
    }
}