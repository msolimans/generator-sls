using Amazon.Lambda.Core;
using System;
using Amazon.Lambda.APIGatewayEvents;
using System.Net;
using Newtonsoft.Json;
using System.Runtime.Serialization;


namespace <%=ProjectName%>
{
    public class <%=Prefix%>Handler
    {
       public APIGatewayProxyResponse Run(<%=Prefix%>Request request)
       {
            var response = new <%=Prefix%>Response("Go Serverless v1.0! Your function executed successfully!", request);

            return new APIGatewayProxyResponse {
                       Body = JsonConvert.SerializeObject(response),
                         StatusCode = (int) HttpStatusCode.OK,
            };
       }
    }


}
