.PHONY: build clean deploy gomodgen

build: gomodgen
	export GO111MODULE=on
### yeoman hook ###
## Don't touch this comment, the subgenerator needs it'
	if [ -a .serverless/<%=projectName%>.zip ]; then rm -rf .serverless/<%=projectName%>.zip; fi;
	mkdir -p .serverless
	zip .serverless/<%=projectName%>.zip bin/*

access:
	chmod -R u+x ./scripts/

clean:
	rm -rf ./bin ./vendor Gopkg.lock

deploy: clean build
	sls deploy --verbosed

gomodgen:
	chmod u+x gomod.sh
	./gomod.sh

local-invoke: clean build access
	./scripts/localinvoke.sh '$(func)' '$(event)' '$(network)'

invoke: local-invoke

local-debug: clean build access
	./scripts/localinvoke.sh '$(func)' '$(event)' '$(network)' 'debug'

debug: local-debug 

sam: build
	sls sam export --output template.yaml

sam-api: sam
	./scripts/samapi.sh '' '$(network)'

api: sam-api

debug-api: sam
	./scripts/samapi.sh 'debug' '$(network)'

sam-invoke: sam
	./scripts/samlocal.sh '$(func)' '$(event)' '$(network)' 'export'

sam-debug: sam access
	./scripts/samdebug.sh '$(func)' '$(event)' '$(network)' 'export'

undeploy:
	sls undeploy --verbosed

test: gomodgen
	go test ./... -cover -count 1