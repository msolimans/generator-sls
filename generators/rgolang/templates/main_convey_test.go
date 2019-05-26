package main

import (
	"encoding/json"
	"github.com/aws/aws-lambda-go/events"
	"testing"
	"context"
	"io/ioutil"
	. "github.com/smartystreets/goconvey/convey"
)

func TestHandler(t *testing.T) {
    t.Parallel()

    Convey("Start Testing!", t, func() {

		Convey("Validating Lambda!", func() {
			raw, err := ioutil.ReadFile("./event.json")

			So(raw, ShouldNotBeNil)
			So(err, ShouldBeNil)

			req := &events.APIGatewayProxyRequest{}
			err = json.Unmarshal(raw, req)

			So(err, ShouldBeNil)

			resp, err := Handler(context.Background(), req)

			So(err, ShouldBeNil)
			So(resp, ShouldNotBeNil)
			So(resp.StatusCode,ShouldEqual, 200)
		})

	})
}
