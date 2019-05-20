using Amazon.Lambda.Core;
using System;


namespace <%=ProjectName%>
{

    public class <%=Prefix%>Response
    {
      public string Message {get; set;}
      public <%=Prefix%>Request Request {get; set;}

      public <%=Prefix%>Response(string message, <%=Prefix%>Request request){
        Message = message;
        Request = request;
      }
    }
}
