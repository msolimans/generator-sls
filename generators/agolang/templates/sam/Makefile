.PHONY: build clean deploy gomodgen

build: gomodgen
	export GO111MODULE=on
### yeoman hook ###
## Don't touch this comment, the subgenerator needs it'

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbosecd

gomodgen:
	chmod u+x gomod.sh
	./gomod.sh

local-api: clean build
	sam local start-api