using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Models
{
    public class Package
    {
        [Key]
        public int PackageId { get; set; }
        public string Name { get; set; }
    }
}