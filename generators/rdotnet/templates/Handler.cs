using Amazon.Lambda.Core;
using System;
using Amazon.Lambda.APIGatewayEvents;
using System.Net;
using Newtonsoft.Json;
using System.Runtime.Serialization;


namespace AwsDotnetCsharp
{
    public class <%=Prefix%>Handler
    {
       public APIGatewayProxyResponse Run(<%=Prefix%>Request request)
       {
         return new APIGatewayProxyResponse
                   {
                       Body = JsonConvert.SerializeObject(new <%=Prefix%>Response("Go Serverless v1.0! Your function executed successfully!", request)),
                         StatusCode = (int) HttpStatusCode.OK,
                   };
       }
    }


}
