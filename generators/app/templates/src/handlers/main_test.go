package main

import (
	"testing"
	"context"
	"github.com/stretchr/testify/assert"
)

func TestHandler(t *testing.T) {
	resp, err := Handler(context.Background())
	assert.Nil(t, err)
	assert.NotNil(t, resp)
	assert.Equal(t, resp.StatusCode, 200)
}
