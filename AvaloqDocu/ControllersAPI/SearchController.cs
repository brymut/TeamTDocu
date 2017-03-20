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
using AvaloqDocu.ViewModels;

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

        [HttpPost]
        [Route("GetFilterSearch")]
        public SearchResultPTO GetFilterSearch(FilterSearchViewModel model)
        {
            var ss = new SearchService();
            string release = model.Release > 0 ? ((ReleaseEnum)model.Release).GetDisplayName() : null;
            string functionalAreas = null;
            string docuType = model.DocuType > 0 ? ((DocuTypeEnum)model.DocuType).GetDisplayName() : null;
            string subType = null;

            if (model.FunctionalAreas != null)
            {
                foreach (var f in model.FunctionalAreas)
                {
                    functionalAreas = functionalAreas + ((FunctionalAreaEnum)f).GetDisplayName() + " ";
                }
            }
            if (model.DocuSubType > 0)
            {
                subType = model.DocuType == (int)DocuTypeEnum.AvaloqCore ? ((AvaloqCoreEnum)model.DocuSubType).GetDisplayName() 
                        : model.DocuType == (int)DocuTypeEnum.AvaloqTools ? ((AvaloqToolsEnum)model.DocuSubType).GetDisplayName() 
                        : model.DocuType == (int)DocuTypeEnum.AvalowFront ? ((AvaloqFrontEnum)model.DocuSubType).GetDisplayName() 
                        : model.DocuType == (int)DocuTypeEnum.ReleaseInfo ? ((ReleaseInfoEnum)model.DocuSubType).GetDisplayName() 
                        : ((SupportEnum)model.DocuSubType).GetDisplayName();
            }
            return ss.FilterSearch(model.query, model.page, model.pageSize, model.TitleOnly, model.DocuId, release, functionalAreas, docuType, subType, model.LastModifiedTo, model.LastModifiedFrom);
        }
    }
}
