package main

import (
	"context"
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"github.com/stretchr/testify/assert"
	"io/ioutil"
	"testing"
)

func TestHandler(t *testing.T) {
	t.Parallel()

	raw, err := ioutil.ReadFile("./event.json")
	assert.Nil(t, err)
	assert.NotNil(t, raw)

	req := &events.APIGatewayProxyRequest{}
	assert.Nil(t, json.Unmarshal(raw, req))
	assert.NotEmpty(t, req.Body)

	resp, err := Handler(context.Background(), req)
	assert.Nil(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, resp.StatusCode, 200)
}
