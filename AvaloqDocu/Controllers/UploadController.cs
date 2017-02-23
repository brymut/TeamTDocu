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

        [HttpPost]
        public ActionResult UploadFiles()
        {
            foreach (string file in Request.Files)
            {
                var statuses = new List<FileMetadata>();
                var headers = Request.Headers;

                for (int i = 0; i < Request.Files.Count; i++)
                {
                    var f = Request.Files[i];
                    f.SaveAs(Server.MapPath("~/App_Data/Uploads/") + f.FileName);

                   // var uservice = new UploadService();
                   // uservice.Create(f);

                    statuses.Add(new FileMetadata()
                    {
                        name = f.FileName,
                        size = f.ContentLength,
                        type = f.ContentType,
                        url = "/App_Data/Uploads/" + f.FileName,
                        delete_url = "/App_Data/Delete/" + f.FileName,
                        delete_type = "GET",
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
        public string type { get; set; }
        public string url { get; set; }
        public string delete_url { get; set; }
        public string thumbnail_url { get; set; }
        public string delete_type { get; set; }
    }
}