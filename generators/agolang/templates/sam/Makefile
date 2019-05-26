.PHONY: build clean deploy gomodgen

build: gomodgen
	export GO111MODULE=on
### yeoman hook ###
## Don't touch this comment, the subgenerator needs it'

access:
	chmod -R u+x ./scripts/

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sam deploy --template-file template.yaml --stack-name <%=projectName%>

gomodgen:
	chmod u+x gomod.sh
	./gomod.sh

local-api: clean build
	sam local start-api

api: clean build
	sam local start-api

debug-api: clean build
	./scripts/samdebugapi.sh '$(network)'

local-invoke: clean build access
	./scripts/localinvoke.sh '$(func)' '$(event)' '$(network)'

sam-invoke: clean build access
	./scripts/samlocal.sh '$(func)' '$(event)' '$(network)'

debug: clean build access
	./scripts/samdebug.sh '$(func)' '$(event)' '$(network)'

sam-debug: clean build access
	./scripts/samdebug.sh '$(func)' '$(event)' '$(network)'

undeploy:
	aws cloudformation delete-stack --stack-name <%=projectName%>

test: gomodgen
	go test ./... -cover -count 1