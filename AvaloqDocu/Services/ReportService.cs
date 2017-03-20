using AvaloqDocu.PresentationTransferObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AvaloqDocu.Services
{
    public class ReportService
    {
        public SearchResultPTO GetDocumentsMissingMetadata()
        {
            using (var dc = new DocuContext())
            {
                var final = new SearchResultPTO();
                var missingMetadata = dc.Documents.Where(m => String.IsNullOrEmpty(m.DocuType) || String.IsNullOrEmpty(m.SubType) || String.IsNullOrEmpty(m.FunctionalArea) || String.IsNullOrEmpty(m.Release));
                final.Total = missingMetadata.Count();
                final.Results = missingMetadata.Take(10).Select(r => new ResultPTO
                {
                    DocumentID = r.DocumentID,
                    DocuID = r.DocuID,
                    DocuType = r.DocuType,
                    FilePath = r.FilePath.FileName,
                    FileSize = r.FileSize,
                    FunctionalArea = r.FunctionalArea,
                    LastModified = r.LastModified,
                    Release = r.Release,
                    Subtitle = r.Subtitle,
                    SubType = r.SubType,
                    Title = r.Title
                }).ToList();
                return final;
            }
        }
    }
}