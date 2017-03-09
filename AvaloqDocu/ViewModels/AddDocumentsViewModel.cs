using AvaloqDocu.PresentationTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.ViewModels
{
    public class AddDocumentsViewModel
    {
        public IEnumerable<BasicDocumentPTO> Documents { get; set; }
        public int PackageId { get; set; }
    }
}