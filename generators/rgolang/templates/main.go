package main

import (
	"bytes"
	"context"
	"encoding/json"
    "<%=APIGwPkg%>"
	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"net/http"
)

// Handler is our lambda handler invoked by the `lambda.Start` function call
func Handler(ctx context.Context, req *events.APIGatewayProxyRequest) (*apigw.APIResponse, error) {
	var buf bytes.Buffer

	body, err := json.Marshal(map[string]interface{}{
		"message": "Okay so your other function also executed successfully!",
	})
	if err != nil {
		return apigw.Err(err)
	}
	json.HTMLEscape(&buf, body)

	return apigw.ResponseWithHeaders(buf.String(), http.StatusOK, map[string]string{
    	"Content-Type":           "application/json",
        "X-MyCompany-Func-Reply": "world-handler",
    })
}

func main() {
	lambda.Start(Handler)
}
