using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nest;
using System.Configuration;

namespace AvaloqDocu.Services
{
    public class ElasticSearchConfig
    {
        public static string Index
        {
            get { return ConfigurationManager.AppSettings["indexName"]; }
            private set {; }
        }

        public static string ElasticSearchUrl
        {
            get { return ConfigurationManager.AppSettings["elasticsearchUrl"]; }
            private set {; }
        }

        // the client that will be used by this application to communicate with Elastic Search
        public static IElasticClient GetClient()
        {

            var node = new Uri("http://localhost:9200");
            var settings = new ConnectionSettings(node)
                               .DefaultIndex("avaloq_docs");


            return new ElasticClient(settings); ;


        }


    }
}