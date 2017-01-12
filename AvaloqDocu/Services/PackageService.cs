using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AvaloqDocu.PresentationTransferObjects;

namespace AvaloqDocu.Services
{
    public class PackageService
    {
        public PackagePTO AddPackage(string name)
        {
            // To be called when user adds a new package.
            return null;
        }

        public void AddDocumentToPackage(int documentId, int packageId)
        {
            // Adding one document to a package.
        }
    }
}