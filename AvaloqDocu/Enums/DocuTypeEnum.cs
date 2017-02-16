using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum DocuTypeEnum
    {
        [Display(Name = "Avaloq Core - System Documentation")]
        AvaloqCore = 1,
        [Display(Name = "Avaloq Front - System Documentation")]
        AvalowFront = 2,
        [Display(Name = "Avaloq Tools - System Documentation")]
        AvaloqTools = 3,
        [Display(Name = "Release Information")]
        ReleaseInfo = 4,
        [Display(Name = "Support")]
        Support = 5
    }
}