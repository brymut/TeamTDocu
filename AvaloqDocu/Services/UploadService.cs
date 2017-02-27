using System;
using System.Collections.Generic;
using System.IO;
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
                    document.DocuID = 0;
                    document.Subtitle = "null";
                    document.Release = "null";
                    document.LastModified = DateTime.Now;
                    document.Subtitle = "foo";
                    document.FileSize = upload.ContentLength;
                    document.Title = upload.FileName;
                    var filepath = new Models.FilePath
                    {
                        FileName = Path.GetFileName(upload.FileName),
                    };
                    document.FilePath = filepath;
                }
                dc.Documents.Add(document);
                dc.SaveChanges();
            }
        }

        public void Delete(int ID)
        {
            using (var dc = new DocuContext())
            {
                dc.Documents.Remove(dc.Documents.Find(ID));
                dc.SaveChanges();
            }
        }
    }
}