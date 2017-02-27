using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AvaloqDocu.Controllers
{
    public class UploadController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public void DeleteFile(string name)
        {
            var path = "~/Uploads/Uploads/" + name;
            if (System.IO.File.Exists(path))
            {
                System.IO.File.Delete(path);
            }
        }

        [HttpPost]
        public ActionResult UploadFiles()
        {
            foreach (string file in Request.Files)
            {
                var statuses = new BlueimpJsonResult();
                statuses.files = new List<FileMetadata>();
                var headers = Request.Headers;

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var f = Request.Files[i];
                    f.SaveAs(Server.MapPath("~/Uploads/Uploads/") + f.FileName);

                    // var uservice = new UploadService();
                    // uservice.Create(f);

                    statuses.files.Add(new FileMetadata()
                    {
                        name = f.FileName,
                        size = f.ContentLength,
                        url = "/Uploads/Uploads/" + f.FileName,
                        deleteUrl = "/Uploads/Delete/" + f.FileName,
                        deleteType = "GET",
                        thumbnailUrl = "null"
                    });
                }
                JsonResult result = Json(statuses);
                result.ContentType = "text/plain";
                return result;
            }
            return Json(new List<FileMetadata>());
        }
    }

    public class FileMetadata
    {
        public string name { get; set; }
        public int size { get; set; }
        public string url { get; set; }
        public string thumbnailUrl { get; set; }
        public string deleteUrl { get; set; }
        public string deleteType { get; set; }
    }

    public class BlueimpJsonResult
    {
        public List<FileMetadata> files { get; set; }
    }
}