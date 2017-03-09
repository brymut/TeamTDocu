using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Models;

namespace AvaloqDocu.Services
{
    public class PackageService
    {
        public PackagePTO AddPackage(string name)
        {
            using (var dc = new DocuContext())
            {
                var package = new Package
                {
                    Name = name
                };
                dc.Packages.Add(package);
                dc.SaveChanges();

                return new PackagePTO
                {
                    Name = package.Name,
                    NumberOfDocuments = 0,
                    PackageId = package.PackageId
                };
            }
        }

        public void AddDocumentToPackage(int documentId, int packageId)
        {
            using (var dc = new DocuContext())
            {
                //var testDocument = new Document
                //{
                //    Title = "Test Document",
                //    Description = "A document as a test",
                //    FilePath = "www.google.com",
                //    UploadDate = DateTime.Today
                //};
                //dc.Documents.Add(testDocument);
                //dc.SaveChanges();

                //documentId = testDocument.DocumentId;
                //packageId = 1;

                var added = new PackageDocument
                {
                    DocumentId = documentId,
                    PackageId = packageId
                };
                dc.PackageDocuments.Add(added);
                dc.SaveChanges();
            }
        }

        public PackageSearchPTO GetPackages(string query, int page)
        {
            using (var dc = new DocuContext())
            {
                var result = new PackageSearchPTO();
                var packages = dc.Packages.Where(s => s.Name.Contains(query));
                result.count = packages.Count();
                var packs = new List<PackagePTO>();
                packages = packages.OrderBy(n => n.Name).Skip((page - 1) * 5).Take(5);
                foreach (var p in packages.ToList())
                {
                    var pto = new PackagePTO
                    {
                        Name = p.Name,
                        PackageId = p.PackageId,
                        NumberOfDocuments = 0,
                        Documents = dc.PackageDocuments.Where(d => d.PackageId == p.PackageId).Select(s => new BasicDocumentPTO { Title = s.Document.Title, DocumentID = s.DocumentId } ).ToList()
                    };
                    packs.Add(pto);
                }
                result.packages = packs;
                return result;
            }
        }

    }
}