using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AvaloqDocu.PresentationTransferObjects;
using AvaloqDocu.Enums;
using AvaloqDocu.Extensions;

namespace AvaloqDocu.Services
{
    public class FilterService
    {
        public IEnumerable<FilterDropdownPTO> GetReleaseOptions()
        {
            var final = new List<FilterDropdownPTO>();
            foreach (var r in Enum.GetValues(typeof(ReleaseEnum))) {
                var release = new FilterDropdownPTO()
                {
                    FilterId = (int)r,
                    Name = r.GetDisplayName()
                };
                final.Add(release);
            }
            return final;
        }

        public IEnumerable<FilterDropdownPTO> GetFunctionalAreas()
        {
            var final = new List<FilterDropdownPTO>();
            foreach (var f in Enum.GetValues(typeof(FunctionalAreaEnum))) {
                var fa = new FilterDropdownPTO()
                {
                    FilterId = (int)f,
                    Name = f.GetDisplayName()
                };
                final.Add(fa);
            }
            return final;
        }

        public IEnumerable<FilterDropdownPTO> GetDocuTypes()
        {
            var final = new List<FilterDropdownPTO>();
            foreach (var t in Enum.GetValues(typeof(DocuTypeEnum)))
            {
                var dt = new FilterDropdownPTO()
                {
                    FilterId = (int)t,
                    Name = t.GetDisplayName()
                };
                final.Add(dt);
            }
            return final;
        }

        public IEnumerable<FilterDropdownPTO> GetDocuSubtypes(int docuType)
        {
            var final = new List<FilterDropdownPTO>();
            if (docuType == (int)DocuTypeEnum.AvaloqCore)
            {
                foreach (var s in Enum.GetValues(typeof(AvaloqCoreEnum)))
                {
                    var st = new FilterDropdownPTO()
                    {
                        FilterId = (int)s,
                        Name = s.GetDisplayName()
                    };
                    final.Add(st);
                }
            }
            else if (docuType == (int)DocuTypeEnum.AvaloqTools)
            {
                foreach (var s in Enum.GetValues(typeof(AvaloqToolsEnum)))
                {
                    var st = new FilterDropdownPTO()
                    {
                        FilterId = (int)s,
                        Name = s.GetDisplayName()
                    };
                    final.Add(st);
                }
            }
            else if (docuType == (int)DocuTypeEnum.AvalowFront)
            {
                foreach (var s in Enum.GetValues(typeof(AvaloqFrontEnum)))
                {
                    var st = new FilterDropdownPTO()
                    {
                        FilterId = (int)s,
                        Name = s.GetDisplayName()
                    };
                    final.Add(st);
                }
            }
            else if (docuType == (int)DocuTypeEnum.ReleaseInfo)
            {
                foreach (var s in Enum.GetValues(typeof(ReleaseInfoEnum)))
                {
                    var st = new FilterDropdownPTO()
                    {
                        FilterId = (int)s,
                        Name = s.GetDisplayName()
                    };
                    final.Add(st);
                }
            }
            else if (docuType == (int)DocuTypeEnum.Support)
            {
                foreach (var s in Enum.GetValues(typeof(SupportEnum)))
                {
                    var st = new FilterDropdownPTO()
                    {
                        FilterId = (int)s,
                        Name = s.GetDisplayName()
                    };
                    final.Add(st);
                }
            }
            return final;
        }
    }
}