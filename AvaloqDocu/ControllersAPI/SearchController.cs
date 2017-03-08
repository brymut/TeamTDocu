using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;
using AvaloqDocu.Models;

namespace AvaloqDocu.ControllersAPI
{
    [RoutePrefix("api/search")]
    public class SearchController : ApiController
    {
        [HttpGet]
        [Route("GetFreeTextSearch")]
        public SearchResultPTO GetFreeTextSearch(string query, int page = 1, int pageSize = 10)
        {
            var ss = new SearchService();
            return ss.FullTextSearch(query, page, pageSize);
            //return ss.TempSearch();
        }

        [HttpGet]
        [Route("GetFilterSearch")]
        public IEnumerable<ResultPTO> GetFilterSearch(string query /* other filters here - possibly pass model instead of individual parameters */)
        {
            var ss = new SearchService();
            return ss.FilterSearch(query);
        }
    }
}
