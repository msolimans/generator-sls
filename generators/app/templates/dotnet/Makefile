.PHONY: build clean deploy gomodgen

build: gomodgen
### yeoman hook ###
## Don't touch this comment, the subgenerator needs it'

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose

gomodgen:
	chmod u+x build.sh
	./build.sh
