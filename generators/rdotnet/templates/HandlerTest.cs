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
            var request = new <%=Prefix%>Request("key1","key2","key3");
            var response = handler.Run(request);
            Assert.Equal(response.StatusCode, (int) HttpStatusCode.OK);

        }
    }
}
