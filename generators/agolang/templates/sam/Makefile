.PHONY: build clean deploy gomodgen

build: gomodgen
	export GO111MODULE=on
### yeoman hook ###
## Don't touch this comment, the subgenerator needs it'

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sam deploy --template-file packaged-template.yaml --stack-name <%=projectName%> --verbosecd

gomodgen:
	chmod u+x gomod.sh
	./gomod.sh

local-api: clean build
	sam local start-api

local-invoke: clean build
	sam local invoke --event $(event) $(func)Function

sam-invoke: clean build
	sam local invoke --event $(event) $(func)

undeploy:
	aws cloudformation delete-stack --stack-name <%=projectName%>

test:
	go test ./... -cover