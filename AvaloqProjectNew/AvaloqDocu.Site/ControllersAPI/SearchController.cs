using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;

namespace AvaloqDocu.ControllersAPI
{
    [RoutePrefix("api/search")]
    public class SearchController : ApiController
    {
        [HttpGet]
        [Route("GetFreeTextSearch")]
        public IEnumerable<ResultPTO> GetFreeTextSearchResults(string query)
        {
            var ss = new SearchService();
            return ss.FullTextSearch(query);
        }

        [HttpGet]
        [Route("GetFilterSearch")]
        public IEnumerable<ResultPTO> GetFilterSearchResults(string query /* other filters here - possibly pass model instead of individual parameters */)
        {
            var ss = new SearchService();
            return ss.FilterSearch(query);
        }
    }
}
