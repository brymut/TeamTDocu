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
    }
}