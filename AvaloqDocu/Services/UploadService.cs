using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using AvaloqDocu.Models;

namespace AvaloqDocu.Services
{
    public class UploadService
    {
        [HttpPost]
        public void Create(HttpPostedFileBase upload)
        {
            using (var dc = new DocuContext())
            {
                var document = new Document { };
                if (upload != null && upload.ContentLength > 0)
                {
                    document.UploadDate = DateTime.Today.Date;
                    document.CreationDate = DateTime.Today.Date;
                    document.Description = "foo";
                    document.FileSize = upload.ContentLength;
                    document.Title = upload.FileName;
                    var filepath = new FilePath
                    {
                        FileName = Path.GetFileName(upload.FileName),
                    };
                    dc.FilePaths.Add(filepath);
                    dc.SaveChanges();
                    document.FilePathId = filepath.FilePathId;
                }
                dc.Documents.Add(document);
                dc.SaveChanges();
            }
        }
    }
}