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

        public IEnumerable<ResultPTO> FilterSearch(string query /* other filters too */)
        {
            // A search with filters.
            return null;
        }
    }
}