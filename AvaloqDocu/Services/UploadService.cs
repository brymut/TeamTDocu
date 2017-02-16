﻿using System;
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
                    document.UploadDate = DateTime.Now;
                    document.Description = "this is a default description";
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
    }
}