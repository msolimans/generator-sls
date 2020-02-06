.PHONY: build clean deploy

build:
	chmod u+x build.sh
	./build.sh

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose

local-api: clean build
	sam local start-api

local-invoke: clean build access
	./scripts/localinvoke.sh '$(func)' '$(event)' '$(network)'

sam-invoke: clean build access
	./scripts/samlocal.sh '$(func)' '$(event)' '$(network)'

debug: clean build access
	./scripts/samlocal.sh '$(func)' '$(event)' '$(network)' 'export' '$(env)' 'debug'

sam-debug: clean build access
	./scripts/samlocal.sh '$(func)' '$(event)' '$(network)' 'export' '$(env)' 'debug'

undeploy:
	aws cloudformation delete-stack --stack-name <%=projectName%>

test:
	dotnet test