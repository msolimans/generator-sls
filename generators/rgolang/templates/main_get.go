package main

import (
	"context"
	<% if (method != "GET") { %>"encoding/json"<% } %>
    "<%=APIGwPkg%>"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"net/http"
)
<% if (method != "GET") { %>
type RequestBody struct {
	Content string `json:"content"`
	Key     string `json:"key"`
}
<% } %>

type ResponseBody struct {
	Message string
	<% if (method != "GET") { %>
	*RequestBody
	<% } %>
}

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(ctx context.Context, req *events.APIGatewayProxyRequest) (*apigw.APIResponse, error) {
    <% if (method != "GET") { %>
    //Unmarshaling request body
    requestBody := &RequestBody{}
	err := json.Unmarshal([]byte(req.Body), requestBody)

	if err != nil {
		return apigw.Err(err)
	}
	<% } %>

    //custom response headers
	responseHeaders := map[string]string{
		"Content-Type":           "application/json",
		"X-MyCompany-Func-Reply": "world-handler",
	}

	//echo back the same request payload with success message
	response := &ResponseBody{Message: "success", <% if (method != "GET") { %> RequestBody: requestBody <% } %> }
	return apigw.ResponseWithHeaders(response, http.StatusOK, responseHeaders)
}

func main() {
	lambda.Start(Handler)
}
