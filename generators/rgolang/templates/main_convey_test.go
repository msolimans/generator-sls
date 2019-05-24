package main

import (
	"testing"
	"context"
	"io/ioutil"
	. "github.com/smartystreets/goconvey/convey"
)

func TestHandler(t *testing.T) {
    t.Parallel()

    Convey("Start Testing!", t, func() {

    	raw, err := ioutil.ReadFile("./event.json")

		Convey("Validating Event!", func() {
			So(raw, ShouldNotBeNil)
			So(err, ShouldBeNil)
		})

        resp, err := Handler(context.Background(), nil)

        Convey("Validating Results!", func() {
            So(err, ShouldBeNil)
            So(resp, ShouldNotBeNil)
            So(resp.StatusCode,ShouldEqual, 200)
        })

	})
}
