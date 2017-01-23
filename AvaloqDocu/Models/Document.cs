using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Models
{
    public class Document
    {
        [Key]
        //public int DocumentId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        //public string FilePath { get; set; }
        //public string  FileName { get; set; }
        //public string Description { get; set; }
        //public DateTime UploadDate { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
