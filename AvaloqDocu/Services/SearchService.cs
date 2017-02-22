using System;
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

        public SearchResultPTO FullTextSearch(string query, int page = 1, int pageSize = 10) ///*int page, int pageSize*/)
        {

            // client to interact with elasticSearch
            client = ElasticSearchConfig.GetClient();

            // query to run against the Author, Title and name field
            var result = client.Search<Document>(x => x
                            .Query(q => q
                                .MultiMatch(mp => mp
                                    .Query(query)
                                        .Fields(f => f
                                            .Fields(f1 => f1.Title, f2 => f2.Subtitle))))
                            .From(page * pageSize)           //pagination options
                            .Size(pageSize));

            // return a result object containing resulting documents from Query along with some more
            // information about the query
            return new SearchResultPTO
            {
                Total = (int)result.Total,
                Page = page,
                Results = result.Documents,
                QueryTime = result.Took,
                // add the aggregations later on
            };
        }

        public SearchResultPTO FilterSearch(string query, int page = 1, int pageSize = 10, string Title = null, string Subtitle = null, int DocuID = 0, string Release = null, string FunctionalArea = null, string DocuType = null, string SubType = null, DateTime? LastModifiedTo = null, DateTime? LastModifiedFrom = null)
        {
            if (LastModifiedFrom == null)
            {
                LastModifiedFrom = DateTime.MinValue;
            }
            if (LastModifiedTo == null)
            {
                LastModifiedTo = DateTime.MaxValue;
            }


            client = ElasticSearchConfig.GetClient();

            var result = client.Search<Document>(x => x

                            .Query(q => q
                                .MultiMatch(mp => mp
                                    .Query(query)
                                        .Fields(f => f
                                            .Fields(f1 => f1.Title, f2 => f2.Subtitle))))
                                            .PostFilter(r => r
                                                .Bool(r1 => r1
                                                    .Must(r2 =>
                                                    {
                                                        if (DocuID == 0)
                                                        {
                                                            return r2.MatchAll();
                                                        }
                                                        else
                                                        {
                                                            return r2.Match(q2 => q2
                                                            .Query(DocuID.ToString())
                                                                .Field(f3 => f3.DocuID));
                                                        }
                                                    })
                                                    .Must(r3 =>
                                                    {
                                                        if (Release == null)
                                                        {
                                                            return r3.MatchAll();
                                                        }
                                                        else
                                                        {
                                                            return r3.Match(q2 => q2
                                                            .Query(Release)
                                                                .Field(f3 => f3.Release));
                                                        }
                                                    })
                                                    .Must(r4 =>
                                                    {
                                                        if (FunctionalArea == null)
                                                        {
                                                            return r4.MatchAll();
                                                        }
                                                        else
                                                        {
                                                            return r4.Match(q2 => q2
                                                            .Query(FunctionalArea)
                                                                .Field(f3 => f3.FunctionalArea));
                                                        }
                                                    })
                                                    .Must(r5 =>
                                                    {
                                                        if (DocuType == null)
                                                        {
                                                            return r5.MatchAll();
                                                        }
                                                        else
                                                        {
                                                            return r5.Match(q2 => q2
                                                            .Query(DocuType)
                                                                .Field(f3 => f3.DocuType));
                                                        }
                                                    })
                                                    .Must(r6 =>
                                                    {
                                                        if (SubType == null)
                                                        {
                                                            return r6.MatchAll();
                                                        }
                                                        else
                                                        {
                                                            return r6.Match(q2 => q2
                                                            .Query(SubType)
                                                                .Field(f3 => f3.SubType));
                                                        }
                                                    })
                                                    .Must(r7 => r7
                                                        .DateRange(d => d
                                                            .GreaterThanOrEquals(LastModifiedFrom)
                                                            .LessThanOrEquals(LastModifiedTo)))))

                            .From(page * pageSize)           //pagination options
                            .Size(pageSize));


            return new SearchResultPTO
            {
                Total = (int)result.Total,
                Page = page,
                Results = result.Documents,
                QueryTime = result.Took,
                // add the aggregations later on
            };
        }
    }
}