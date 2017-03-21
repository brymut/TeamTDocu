using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using Nest;


namespace AvaloqDocu.Services
{
    public class UploadService
    {
        private IElasticClient client;

        [HttpPost]
        public void Create(HttpPostedFileBase upload)
        {
            // client to interact with elasticSearch
            client = ElasticSearchConfig.GetClient();

            //Most of Avaloq's document filenames follow the format of ID-ReleaseNum-ClientNum-Subtype-Subtitle.pdf
            //The service checks if the given file follows the same format, and if so, retrieves the metadata.
            using (var dc = new DocuContext())
            {
                var document = new Models.Document { };
                var fileName = upload.FileName;
                String[] metadata = fileName.Split('-');
                if (upload != null && upload.ContentLength > 0 && metadata.Length >= 5)
                {
                    document.SubType = metadata[3];
                    if(metadata[1].Equals("en"))
                        document.Release = "Release Independent";
                    else document.Release = "Release " + metadata[1];
                    document.LastModified = DateTime.Today.Date;
                    document.FileSize = upload.ContentLength;
                    document.Title = upload.FileName;
                    document.Subtitle = metadata[4];
                    var filepath = new Models.FilePath
                    {
                        FileName = Path.GetFileName(upload.FileName),
                    };
                    document.FilePath = filepath;
                }
                else if (upload != null && upload.ContentLength > 0)
                {
                    document.SubType = "null";
                    document.Release = "null";
                    document.LastModified = DateTime.Today.Date;
                    document.FileSize = upload.ContentLength;
                    document.Title = upload.FileName;
                    document.Subtitle = "null";
                    var filepath = new Models.FilePath
                    {
                        FileName = Path.GetFileName(upload.FileName),
                    };
                    document.FilePath = filepath;
                }
                dc.Documents.Add(document);
                dc.SaveChanges();
                document.FilePath = null;
                var result = client.Index(document);
            }
        }

        public void Delete(string path)
        {
            using (var dc = new DocuContext())
            {
                dc.Documents.Remove(dc.Documents.First(s => s.FilePath.FileName == path));
                dc.SaveChanges();
            }
        }
    }
}