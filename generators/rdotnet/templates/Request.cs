using Amazon.Lambda.Core;
using System;



namespace <%=ProjectName%>
{
    public class <%=Prefix%>Request
    {
      public string Key1 {get; set;}
      public string Key2 {get; set;}
      public string Key3 {get; set;}

      public <%=Prefix%>Request(string key1, string key2, string key3){
        Key1 = key1;
        Key2 = key2;
        Key3 = key3;
      }
    }
}
