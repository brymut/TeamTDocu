using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Models
{
    public class PackageDocument
    {
        [Key, Column(Order = 0)]
        public int PackageId { get; set; }
        [Key, Column(Order = 1)]
        public int DocumentId { get; set; }
        [ForeignKey("PackageId")]
        public virtual Package Package { get; set; }
        [ForeignKey("DocumentId")]
        public virtual Document Document { get; set; }
    }
}