using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum AvaloqToolsEnum
    {
        [Display(Name = "Business User Guide")]
        BusUserGuide = 1,
        [Display(Name = "Customisation/Parameterisation Guide")]
        CustomParamGuide = 2,
        [Display(Name = "Installation Guide")]
        InstallGuide = 3,
        [Display(Name = "Reference Guide")]
        RefGuide = 4,
        [Display(Name = "Release Notes")]
        ReleaseNotes = 5,
        [Display(Name = "Technical Requirements")]
        TechReqments = 6
    }
}