using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;
using AvaloqDocu.Models;
using AvaloqDocu.Enums;
using AvaloqDocu.Extensions;

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
        public SearchResultPTO GetFilterSearch(string query, int page = 1, int pageSize = 10, bool titleOnly = false, int DocuID = 0, int Release = 0, IEnumerable<int> FunctionalArea = null, int DocuType = 0, int SubType = 0, DateTime? LastModifiedTo = null, DateTime? LastModifiedFrom = null)
        {
            var ss = new SearchService();
            string release = Release > 0 ? ((ReleaseEnum)Release).GetDisplayName() : null;
            string functionalArea = null;
            string docuType = DocuType > 0 ? ((DocuTypeEnum)DocuType).GetDisplayName() : null;
            string subType = null;

            if (FunctionalArea != null)
            {
                foreach (var f in FunctionalArea)
                {
                    functionalArea = functionalArea + ((FunctionalAreaEnum)f).GetDisplayName() + " ";
                }
            }
            if (SubType > 0)
            {
                subType = DocuType == (int)DocuTypeEnum.AvaloqCore ? ((AvaloqCoreEnum)SubType).GetDisplayName() 
                        : DocuType == (int)DocuTypeEnum.AvaloqTools ? ((AvaloqToolsEnum)SubType).GetDisplayName() 
                        : DocuType == (int)DocuTypeEnum.AvalowFront ? ((AvaloqFrontEnum)SubType).GetDisplayName() 
                        : DocuType == (int)DocuTypeEnum.ReleaseInfo ? ((ReleaseInfoEnum)SubType).GetDisplayName() 
                        : ((SupportEnum)SubType).GetDisplayName();
            }
            return ss.FilterSearch(query, page, pageSize, titleOnly, DocuID, release, functionalArea, docuType, subType, LastModifiedTo, LastModifiedFrom);
        }
    }
}
