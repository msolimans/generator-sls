.PHONY: build clean deploy gomodgen

build: gomodgen
	export GO111MODULE=on
### yeoman hook ###
## Don't touch this comment, the subgenerator needs it'
	if [ -a .serverless/<%=projectName%>.zip ]; then rm -rf .serverless/<%=projectName%>.zip; fi;
	mkdir -p .serverless
	zip .serverless/<%=projectName%>.zip bin/*

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbosed

gomodgen:
	chmod u+x gomod.sh
	./gomod.sh

sam: build
	sls sam export --output template.yaml

local-api: sam
	sam local start-api

sam-invoke: sam
	sam local invoke --event $(event) $(func)

local-invoke: build
	docker run --rm -v $(shell pwd)/bin:/var/task lambci/lambda:go1.x $(func) $(event)

undeploy:
	sls undeploy --verbosed

test:
	go test ./... -cover