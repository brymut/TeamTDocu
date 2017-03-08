using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.PresentationTransferObjects
{
    public class PackageSearchPTO
    {
        public int count { get; set; }
        public IEnumerable<PackagePTO> packages { get; set; }
    }
}