package apigw

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
)

//APIResponse is of type APIGatewayProxyResponse
type APIResponse events.APIGatewayProxyResponse

//Ok marshals response data and returns 200 status code
func Ok(data interface{}) (*APIResponse, error) {
	body, err := json.Marshal(data)
	if err != nil {
		return &APIResponse{
			Body:       fmt.Sprintf("Err Marshaling response: %v", err.Error()),
			StatusCode: http.StatusOK,
		}, nil
	}

	return &APIResponse{
		Body:       string(body),
		StatusCode: http.StatusOK,
	}, nil
}

//NotFound accepts message(s) and returns Not Found status code, 404, with all combined passed message(s)
func NotFound(message ...string) (*APIResponse, error) {
	if len(message) > 0 {
		return Response(strings.Join(message, ","), http.StatusInternalServerError)
	}

	return Response("Not Found", http.StatusNotFound)
}

//ServerErr returns Internal Server Err code, 500
func ServerErr(message ...string) (*APIResponse, error) {
	if len(message) > 0 {
		return Response(strings.Join(message, ","), http.StatusInternalServerError)
	}

	return Response("Internal Server Error", http.StatusInternalServerError)
}

//Response Simplifies responses for Lambda, just pass data and statusCode
func Response(data interface{}, code int) (*APIResponse, error) {
	return ResponseWithHeaders(data, code, nil)
}

//Err Returns error in a specified format
func Err(err error, code ...int) (*APIResponse, error) {
	data := map[string]string{
		"err": err.Error(),
	}
	body, _ := json.Marshal(data)
	status := http.StatusInternalServerError
	if len(code) > 0 {
		status = code[0]
	}

	return &APIResponse{
		Body:       string(body),
		StatusCode: status,
	}, err
}

//ResponseWithHeaders requires all response data members to be filled in
func ResponseWithHeaders(data interface{}, code int, headers map[string]string, isBase64 ...bool) (*APIResponse, error) {
	body, err := json.Marshal(data)
    if err != nil {
        return Err(err, http.StatusInternalServerError)
    }

	base64 := false
	if len(isBase64) > 0 {
		base64 = isBase64[0]
	}

	return &APIResponse{
		Body:            string(body),
		StatusCode:      code,
		IsBase64Encoded: base64,
		Headers:         headers,
	}, nil
}
