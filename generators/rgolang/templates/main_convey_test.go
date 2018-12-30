package main

import (
	"testing"
	"context"
	. "github.com/smartystreets/goconvey/convey"
)

func TestHandler(t *testing.T) {

    Convey("Start Testing!", t, func() {

        resp, err := Handler(context.Background())

        Convey("Validating Results!", func() {
            So(err, ShouldBeNil)
            So(resp, ShouldNotBeNil)
            So(resp.StatusCode,ShouldEqual, 200)
        })

	})
}
