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
    [RoutePrefix("api/Filter")]
    public class FilterController : ApiController
    {
        [HttpGet]
        [Route("GetReleaseOptions")]
        public IEnumerable<FilterDropdownPTO> GetReleaseOptions()
        {
            var fService = new FilterService();
            return fService.GetReleaseOptions();
        }

        [HttpGet]
        [Route("GetFunctionalAreas")]
        public IEnumerable<FilterDropdownPTO> GetFunctionalAreas()
        {
            var fService = new FilterService();
            return fService.GetFunctionalAreas();
        }

        [HttpGet]
        [Route("GetDocuTypes")]
        public IEnumerable<FilterDropdownPTO> GetDocuTypes()
        {
            var fService = new FilterService();
            return fService.GetDocuTypes();
        }

        [HttpGet]
        [Route("GetDocuSubTypes")]
        public IEnumerable<FilterDropdownPTO> GetDocuSubTypes(int docuType)
        {
            var fService = new FilterService();
            return fService.GetDocuSubtypes(docuType);
        }
    }
}