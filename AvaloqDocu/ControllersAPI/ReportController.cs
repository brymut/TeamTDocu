using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace AvaloqDocu.ControllersAPI
{
    [RoutePrefix("api/Report")]
    public class ReportController : ApiController
    {
        [HttpGet]
        [Route("GetDocumentsMissingMetadata")]
        public SearchResultPTO GetDocumentsMissingMetadata()
        {
            var rService = new ReportService();
            return rService.GetDocumentsMissingMetadata();
        }
    }
}