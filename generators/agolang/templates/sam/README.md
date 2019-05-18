# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally  

Suppose we have added `rest` handler:

```bash
    #Invoke function (Notice Rest starts with uppercase letter)
    $ make local-invoke func=rest event=/rest/event.json 
    #Using SAM, Notice Function added after Rest here
    $ sam local invoke --event /rest/event.json RestFunction
```

There's also a way of starting the API and exposing it as an HTTP endpoint to be tested by POSTMAN

```bash
    #Start local API on port 3000
    $ make local-api 
```

-   `func` specified in capital case `Create`
-   `event` path to the event file, default is the event.json under the route/func specifed in `func`
-   `network` docker network inside which sam will run or execute your container (lambda)

### Debug locally `make ... local-debug|sam-debug`

Debugging is easier than you might think. Run the following command, it will create a debugging session on port `8997`, put the break points, attach your favourite IDE to the same port and boom!

```bash
    $ make debug network=services_default func=create event=create/event.json
```

-   `func` specified in capital case `Create`
-   `event` path to the event file 
-   `network` is a docker network inside which you need to run your lambda as a container

### Deploy project remotely

```bash
    $ make deploy
```

### Deploy a function remotely

```bash
    $ cd funcName && make deploy  
```

### UnDeploy

```bash
    $ make undeploy
```

## Continuous Integration

### Test with mocha

```bash
    $ make test
```
