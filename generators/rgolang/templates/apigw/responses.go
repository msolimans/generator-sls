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
type Headers map[string]string

//Ok returns response data as text and with 200 status code
func Ok(data interface{}) (*APIResponse, error) {
	return ResponseWithHeaders(data, http.StatusOK, nil)
}

//Json marshals response data into json and returns it with status code 200
func Json(data interface{}) (*APIResponse, error) {
	return ResponseWithHeaders(data, http.StatusOK, Headers{"Content-Type": "application/json"})
}

//ServerErr returns Not Found code, 404
func NotFound(message ...string) (*APIResponse, error) {
	if len(message) > 0 {
		return Response(fmt.Sprintf(`{"type": "err", "message": "%s"}`, strings.Join(message, ",")), http.StatusNotFound)
	}

	return Response(`{"type": "err", "msg": "Not Found"}`, http.StatusNotFound)
}

//ServerErr returns Internal Server Err code, 500
func ServerErr(message ...string) (*APIResponse, error) {
	if len(message) > 0 {
		return Response(fmt.Sprintf(`{"type": "err", "message": "%s"}`, strings.Join(message, ",")), http.StatusInternalServerError)
	}

	return Response(`{"type": "err", "msg": "Internal Server Error"}`, http.StatusInternalServerError)
}

//Response Simplifies responses for Lambda, just pass data and statusCode
func Response(data interface{}, code int) (*APIResponse, error) {
	return ResponseWithHeaders(data, code, nil)
}

//Err Returns error in a specified format with specific status code
func Err(err error, code ...int) (*APIResponse, error) {
	status := http.StatusInternalServerError
	if len(code) > 0 {
		status = code[0]
	}

	return &APIResponse{
		Body:       fmt.Sprintf(`{"type": "err", "msg": "%s"}`, err.Error()),
		StatusCode: status,
	}, nil
}

//ResponseWithHeaders requires all response data members to be filled in
func ResponseWithHeaders(data interface{}, code int, headers map[string]string, isBase64 ...bool) (*APIResponse, error) {
	var body string
	if v, ok := data.(string); ok {
		body = v
	} else {
		resp, err := json.Marshal(data)
		if err != nil {
			return Err(err, http.StatusInternalServerError)
		}

		if _, ok := headers["Content-Type"]; !ok {
			headers["Content-Type"] = "application/json"
		}

		body = string(resp)
	}

	base64 := false
	if len(isBase64) > 0 {
		base64 = isBase64[0]
	}

	return &APIResponse{
		Body:            body,
		StatusCode:      code,
		IsBase64Encoded: base64,
		Headers:         headers,
	}, nil
}
