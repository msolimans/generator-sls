using System;
using System.Net;
using Xunit;
using <%=ProjectName%>;

namespace <%=ProjectName%>.Tests
{
    public class <%=Prefix%>HandlerTest
    {
        [Fact]
        public void Test1()
        {
            <%=Prefix%>Handler handler = new <%=Prefix%>Handler();
            var response = handler.Run(new <%=Prefix%>Request("key1","key2","key3"));
            Assert.Equal(response.StatusCode, (int) HttpStatusCode.OK);

        }
    }
}
