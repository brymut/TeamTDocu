using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum OrderByEnum
    {
        [Display(Name = "Title")]
        Title = 1,
        [Display(Name = "Docu ID")]
        DocuId = 2,
        [Display(Name = "Release")]
        Release = 3,
        [Display(Name = "Docu Type")]
        DocuType = 4,
        [Display(Name = "Last Modified")]
        LastModified = 5
    }
}