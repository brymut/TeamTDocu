using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.ViewModels
{
    public class FilterSearchViewModel
    {
        public string query { get; set; }
        public int page { get; set; }
        public int pageSize { get; set; }
        public int DocuId { get; set; }
        public int Release { get; set; }
        public IEnumerable<int> FunctionalAreas { get; set; }
        public int DocuType { get; set; }
        public int DocuSubType { get; set; }
        public DateTime? LastModifiedTo { get; set; }
        public DateTime? LastModifiedFrom { get; set; }
        public bool TitleOnly { get; set; }
    }
}