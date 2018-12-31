using Amazon.Lambda.Core;
using System;



namespace AwsDotnetCsharp
{
    public class <%=Prefix%>Handler
    {
       public <%=Prefix%>Response Run(<%=Prefix%>Request request)
       {
           return new <%=Prefix%>Response("Go Serverless v1.0! Your function executed successfully!", request);
       }
    }


}
