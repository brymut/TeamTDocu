using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AvaloqDocu.Models;
using AvaloqDocu.PresentationTransferObjects;

namespace AvaloqDocu.Services
{
    public class SearchService
    {
        public IEnumerable<ResultPTO> FullTextSearch(string query)
        {
            // Full text search, with no filters, to go here
            return null;
        }

        public IEnumerable<ResultPTO> FilterSearch(string query /* other filters too */)
        {
            // A search with filters.
            return null;
        }
    }
}