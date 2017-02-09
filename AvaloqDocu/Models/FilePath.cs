using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Models
{
    using System.ComponentModel.DataAnnotations;
    public class FilePath
    {
        public int FilePathId { get; set; }
        public string FileName { get; set; }
    }
}