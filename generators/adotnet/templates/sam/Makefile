.PHONY: build clean deploy

build:
	chmod u+x build.sh
	./build.sh

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose


