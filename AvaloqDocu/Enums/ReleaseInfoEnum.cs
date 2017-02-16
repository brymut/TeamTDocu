using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum ReleaseInfoEnum
    {
        [Display(Name = "Announcements")]
        Announcements = 1,
        [Display(Name = "Avaloq Deployment Program (ADP)")]
        ADP = 2,
        [Display(Name = "Release Planning")]
        ReleasePlan = 3,
        [Display(Name = "Release Scope")]
        ReleaseScope = 4
    }
}