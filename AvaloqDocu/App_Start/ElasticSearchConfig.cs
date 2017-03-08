using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Nest;
using System.Configuration;
using AvaloqDocu.Models;

namespace AvaloqDocu
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

        /// <summary>
        ///  the client that will be used by this application to communicate with Elastic Search
        /// </summary>
        /// <returns> Instance of client that will be used through out the application</returns>
        public static IElasticClient GetClient()
        {

            var node = new Uri("http://localhost:9200");
            var settings = new ConnectionSettings(node)
                               .DefaultIndex("avaloq_documents");


            return new ElasticClient(settings); ;


        }
        /// <summary>
        ///  Creates the "schema" that ElasticSearch will use to analyse and index the documents.
        /// </summary>
        public static void CreateDefaultIndex()
        {
            var client = GetClient();
            if (!(client.IndexExists("avaloq_documents").Exists))
            {

                var indexDescriptor = new CreateIndexDescriptor("avaloq_documents")
                                        .Mappings(ms => ms
                                                  .Map<Document>(m => m
                                                       .AutoMap()
                                                       .Properties(p => p
                                                             .Number(s => s
                                                                  .Name(c => c.DocuID)
                                                                  .Type(NumberType.Integer))
                                                             .Date(s => s
                                                                  .Name(c => c.LastModified)
                                                                  )
                                                             .Text(s => s
                                                                  .Name(c => c.FilePath)
                                                                  .Index(false)))));

                var response = client.CreateIndex(indexDescriptor);

            }



        }


    }
}