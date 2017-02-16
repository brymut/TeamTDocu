using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum AvaloqFrontEnum
    {
        [Display(Name = "Concept Description")]
        ConceptDescription = 1,
        [Display(Name = "Customisation/Parameterisation Guide")]
        CustomParamGuide = 2,
        [Display(Name = "Installation Guide")]
        InstallGuide = 3,
        [Display(Name = "New Feature Description")]
        NewFeatDesc = 4,
        [Display(Name = "Technical Requirements")]
        TechReqments = 5
    }
}