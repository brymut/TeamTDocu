﻿using System;
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
        public IEnumerable<ResultPTO> GetFilterSearchResults(string query, int page = 1, int pageSize = 10, string Title = null, string Subtitle = null, int DocuID = 0, string Release = null, string FunctionalArea = null, string DocuType = null, string SubType = null, DateTime? LastModified = null)
        {
            var ss = new SearchService();
            return ss.FilterSearch(query, page, pageSize, Title, Subtitle, DocuID, Release, FunctionalArea, DocuType, SubType, LastModified);
        }
    }
}
