﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AvaloqDocu.Models;
using AvaloqDocu.PresentationTransferObjects;
using Nest;

namespace AvaloqDocu.Services
{
    public class SearchService
    {

        private IElasticClient client;

        public SearchResultPTO FullTextSearch(string query, int page = 1, int pageSize = 10)
        {
            int offset = 1;
            if (page > 1)
            {
                offset = page * pageSize;
            }

            // client to interact with elasticSearch
            client = ElasticSearchConfig.GetClient();

            // query to run against the Author, Title and name field
            var result = client.Search<Document>(x => x
                            .Query(q => q
                                .MultiMatch(mp => mp
                                    .Query(query)
                                        .Fields(f => f
                                            .Fields(f1 => f1.Title, f2 => f2.Subtitle))))
                            .From(offset)           //pagination options
                            .Size(pageSize));

            // return a result object containing resulting documents from Query along with some more
            // information about the query results
            return new SearchResultPTO
            {
                Total = (int)result.Total,
                Page = page,
                Results = result.Documents.Select(s => new ResultPTO()
                {
                    DocuID = s.DocuID,
                    DocumentID = s.DocumentID,
                    DocuType = s.DocuType,
                    FileSize = s.FileSize,
                    FilePath = s.FilePath.FileName,
                    Subtitle = s.Subtitle,
                    FunctionalArea = s.FunctionalArea,
                    LastModified = s.LastModified,
                    Release = s.Release,
                    SubType = s.SubType,
                    Title = s.Title
                }),
                QueryTime = result.Took,
                // add the aggregations later on
            };
        }

        public SearchResultPTO FilterSearch(string query, int page = 1, int pageSize = 10, bool titleOnly = false, int DocuID = 0, string Release = null, string FunctionalArea = null, string DocuType = null, string SubType = null, DateTime? LastModifiedTo = null, DateTime? LastModifiedFrom = null, string sortBy = null)
        {
            var filters = new List<Func<QueryContainerDescriptor<Document>, QueryContainer>>();


            if (DocuID != 0)
            {
                filters.Add(r2 => r2.Match(q2 => q2
                                           .Query(DocuID.ToString())
                                                .Field(f3 => f3.DocuID)));
            }

            if (FunctionalArea != null)
            {
                filters.Add(r2 => r2.Match(q2 => q2
                                            .Query(FunctionalArea)
                                                 .Field(f3 => f3.FunctionalArea)));
            }

            if (Release != null)
            {
                if (Release != "release independent")
                {
                    Release += ".0.0.0";
                }
                filters.Add(r2 => r2.Match(q2 => q2
                                           .Query(Release)
                                                .Field(f3 => f3.Release)));
            }
            if (LastModifiedFrom != null)
            {
                filters.Add(r2 => r2.DateRange(d => d
                                                .Field(d1 => d1.LastModified)
                                                .GreaterThanOrEquals(LastModifiedFrom)));
            }

            if (LastModifiedTo != null)
            {
                filters.Add(r2 => r2.DateRange(d => d
                                                .Field(d1 => d1.LastModified)
                                                .LessThanOrEquals(LastModifiedTo)));
            }

            if (DocuType != null)
            {
                filters.Add(r2 => r2.Match(q2 => q2
                                             .Query(DocuType)
                                             .Field(f3 => f3.DocuType)));
            }


            if (SubType != null)
            {
                filters.Add(r2 => r2.Match(q2 => q2
                                          .Query(SubType)
                                          .Field(f3 => f3.SubType)));
            }




            client = ElasticSearchConfig.GetClient();

            int offset = 1;
            if (page > 1)
            {
                offset = page * pageSize;
            }

            var result = client.Search<Document>(x => x

                            .Sort(sort =>
                            {

                                if (sortBy == "LastModified")
                                {
                                    return sort.Descending(r => r.LastModified);
                                }
                                else if (sortBy == "DocuID")
                                {
                                    return sort.Descending(r => r.DocuID);
                                }

                                else
                                {
                                    return sort.Descending("_score");
                                }
                            })
                            .Query(q => q
                                .MultiMatch(mp => mp
                                    .Query(query)
                                        .Fields(f => f
                                            .Fields(f1 => f1.Title, f2 => f2.Subtitle))))
                               .PostFilter(r => r
                                    .Bool(r1 => r1.Must(filters)))
                               .From(offset)           //pagination options
                               .Size(pageSize)
             );

            //var final = postFilter.OrderByDescending(r1 => r1.LastModified);


            return new SearchResultPTO
            {
                Total = (int)result.Total,
                Page = page,
                Results = result.Documents.Select(s => new ResultPTO()
                {
                    DocuID = s.DocuID,
                    DocumentID = s.DocumentID,
                    DocuType = s.DocuType,
                    FileSize = s.FileSize,
                    FilePath = s.FilePath.FileName,
                    Subtitle = s.Subtitle,
                    FunctionalArea = s.FunctionalArea,
                    LastModified = s.LastModified,
                    Release = s.Release,
                    SubType = s.SubType,
                    Title = s.Title
                }),
                QueryTime = result.Took,
                // add the aggregations later on
            };
        }

        public SearchResultPTO TempSearch()
        {
            using (var dc = new DocuContext())
            {
                var docs = dc.Documents.Where(i => i.FileSize > 0).ToList();
                var newDocs = new List<ResultPTO>();
                foreach (var s in docs.ToList())
                {
                    var d2 = new ResultPTO()
                    {
                        DocuID = s.DocuID,
                        DocumentID = s.DocumentID,
                        DocuType = s.DocuType,
                        FileSize = s.FileSize,
                        FilePath = s.FilePath.FileName,
                        Subtitle = s.Subtitle,
                        FunctionalArea = s.FunctionalArea,
                        LastModified = s.LastModified,
                        Release = s.Release,
                        SubType = s.SubType,
                        Title = s.Title
                    };
                    newDocs.Add(d2);
                }
                return new SearchResultPTO
                {
                    Total = docs.Count(),
                    Page = 1,
                    Results = newDocs,
                    QueryTime = 999
                };
            }
        }
    }
}