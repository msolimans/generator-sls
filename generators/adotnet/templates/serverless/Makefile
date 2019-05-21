.PHONY: build clean deploy

build:
	chmod u+x build.sh
	./build.sh

clean:
	rm -rf ./bin

deploy: clean build
	sls deploy --verbose

sam: build
	sls sam export --output template.yaml

local-api: sam
	sam local start-api

local-invoke: clean build
	./localinvoke.sh '$(func)' '$(event)' '$(network)'

test:
	cd ../<%=projectName%>.Tests && dotnet test