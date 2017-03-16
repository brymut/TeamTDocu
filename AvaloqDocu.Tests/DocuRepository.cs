﻿using AvaloqDocu.Models;
using AvaloqDocu.Tests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

public class DocuRepository
{
    private MockContext Context;
    public DocuRepository(MockContext context)
    {
        Context = context;
    }

    public IEnumerable<Package> GetPackages()
    {
        return Context.Packages.ToList();
    }

    public IEnumerable<Document> GetDocuments()
    {
        return Context.Documents.ToList();
    }

    public Document GetDocumentByName(string name)
    {
        return Context.Documents.Where(m => m.Title == name).First();
    }

    public IEnumerable<PackageDocument> GetPDs()
    {
        return Context.PackageDocuments.ToList();
    }

    public IEnumerable<FilePath> GetFilePaths()
    {
        return Context.FilePaths.ToList();
    }

    public IEnumerable<PackageDocument> GetPDsByDocName(string name)
    {
        return Context.PackageDocuments.Where(m => m.Document.Title == name).ToList();
    }
}
