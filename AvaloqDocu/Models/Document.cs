using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Models
{
    public class Document
    {
        [Key]
        public int DocumentId { get; set; }
        public string Title { get; set; }
        public int FilePathId { get; set; }
        public int FileSize { get; set; }
        public string Description { get; set; }
        public DateTime UploadDate { get; set; }
        public DateTime CreationDate { get; set; }
        [ForeignKey("FilePathId")]
        public virtual FilePath FilePath { get; set; }

    }
}