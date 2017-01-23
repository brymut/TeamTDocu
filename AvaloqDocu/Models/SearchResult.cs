using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Models
{
    public class SearchResult
    {
        // total number of results
        public int Total { get; set; }
        public IEnumerable<Document> Results { get; set; }
        public long QueryTime { get; set; }

    }
}