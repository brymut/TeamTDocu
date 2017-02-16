using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum ReleaseEnum
    {
        [Display(Name = "Release Independent")]
        ReleaseIndependent=1,
        [Display(Name = "Release 2.5")]
        Release25=25,
        [Display(Name = "Release 2.6")]
        Release26 =26,
        [Display(Name = "Release 2.7")]
        Release27 =27,

        [Display(Name = "Release 3.1")]
        Release31 =31,
        [Display(Name = "Release 3.2")]
        Release32 =32,
        [Display(Name = "Release 3.3")]
        Release33 =33,
        [Display(Name = "Release 3.4")]
        Release34 =34,
        [Display(Name = "Release 3.5")]
        Release35 =35,
        [Display(Name = "Release 3.6")]
        Release36 =36,
        [Display(Name = "Release 3.7")]
        Release37 =37,
        [Display(Name = "Release 3.8")]
        Release38 =38,
        [Display(Name = "Release 3.9")]
        Release39 =39,
        [Display(Name = "Release 3.10")]
        Release310 =40,

        [Display(Name = "Release 4.1")]
        Release41 =41,
        [Display(Name = "Release 4.2")]
        Release42 =42,
        [Display(Name = "Release 4.3")]
        Release43 =43,
        [Display(Name = "Release 4.4")]
        Release44 =44
    }
}