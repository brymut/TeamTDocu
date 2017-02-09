using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AvaloqDocu.Services
{
    public class UploadService
    {
        [HttpPost]
        public void Create(HttpPostedFileBase upload)
        {
            using (var dc = new DocuContext())
            {
                var document = new Models.Document { };
                if (upload != null && upload.ContentLength > 0)
                {
                    document.DocumentId = 0;
                    document.Author = "null";
                    document.Description = "null";
                    document.Title = "null";
                    var filepath = new Models.FilePath
                    {
                        FileName = System.IO.Path.GetFileName(upload.FileName),
                    };
                    document.FilePath = filepath;
                }
                dc.Documents.Add(document);
                dc.SaveChanges();
            }
        }
    }
}