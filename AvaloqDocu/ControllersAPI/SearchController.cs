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
        public SearchResultPTO GetFreeTextSearchResults(string query, int page = 1, int pageSize = 10)
        {
            var ss = new SearchService();
            return ss.FullTextSearch(query, page, pageSize);
        }

        [HttpGet]
        [Route("GetFilterSearch")]
        //public IEnumerable<ResultPTO> GetFilterSearchResults(string query /* other filters here - possibly pass model instead of individual parameters */)
        public SearchResultPTO GetFilterSearchResults(string query, int page = 1, int pageSize = 10, bool titleOnly = false, int DocuID = 0, string Release = null, string FunctionalArea = null, string DocuType = null, string SubType = null, DateTime? LastModifiedTo = null, DateTime? LastModifiedFrom = null)
        {
            var ss = new SearchService();
            return ss.FilterSearch(query, page, pageSize, titleOnly, DocuID, Release, FunctionalArea, DocuType, SubType, LastModifiedTo, LastModifiedFrom);
        }
    }
}
