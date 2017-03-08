using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.PresentationTransferObjects
{
    public class ResultPTO
    {
        public int DocumentID { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public int DocuID { get; set; }
        public string Release { get; set; }
        public string FunctionalArea { get; set; }
        public string DocuType { get; set; }
        public string SubType { get; set; }
        public DateTime LastModified { get; set; }
        public string FilePath { get; set; }
        public int FileSize { get; set; }
    }
}