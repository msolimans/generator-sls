.PHONY: build clean deploy

build:
	chmod u+x build.sh
	./build.sh

clean:
	rm -rf ./build

deploy: clean build
	sls deploy --verbose
