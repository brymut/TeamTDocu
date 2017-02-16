using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace AvaloqDocu.Enums
{
    public enum AvaloqCoreEnum
    {
        [Display(Name = "Administation Guide")]
        AdminGuide = 1,
        [Display(Name = "Business User Guide")]
        BusUserGuide = 2,
        [Display(Name = "Concept Description")]
        ConcDescript = 3,
        [Display(Name = "Customisation/Parameterisation Guide")]
        CustParamGuide = 4,
        [Display(Name = "Customisation/Parameterisation Upgrade Guide")]
        CustParamUpgrade = 5,
        [Display(Name = "Functional Description")]
        FunctionalDesc = 6,
        [Display(Name = "Installation Guide")]
        InstallGuide = 7,
        [Display(Name = "New Feature Description")]
        NewFeatDesc = 8,
        [Display(Name = "Reference Guide")]
        RefGuide = 9,
        [Display(Name = "Requirements")]
        Requirements = 10,
        [Display(Name = "Technical Requirements")]
        TechRequirements = 11,
        [Display(Name = "Upgrade Documentation")]
        UpgradeDocu = 12
    }
}