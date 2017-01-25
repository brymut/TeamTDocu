using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AvaloqDocu.PresentationTransferObjects;

namespace AvaloqDocu.Models
{
    public class SearchResultPTO
    {
        // total number of results
        public int Total { get; set; }
        //public IEnumerable<ResultPTO> Results { get; set; }
        // switch back to using ResultPTO later on..
        public IEnumerable<Document> Results { get; set; }
        public long QueryTime { get; set; }
        // current page, used for pagination
        public int Page { get; set; }

    }
}