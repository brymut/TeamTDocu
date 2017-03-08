using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.PresentationTransferObjects
{
    public class PackagePTO
    {
        public int PackageId { get; set; }
        public string Name { get; set; }
        public int NumberOfDocuments { get; set; }
        public IEnumerable<string> Documents { get; set; }
    }
}