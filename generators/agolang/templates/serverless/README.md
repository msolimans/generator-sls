# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally 

This is not supported by Serverless framework itself, however we wired this up with `lambci/lambda`: 

```bash
    #OR invoke function (using lambci/lambda)  
    $ make local-invoke func=funcName event=/path/to/event.json
    #OR invoke function using SAM [will export to SAM, build and invoke func]
    $ make sam-invoke func=funcName event=/path/to/event.json
```

-   `func` specified in capital case `Rest`
-   `event` path to the event file
-   `network` is a docker network you need inside which you need to run your lambda as container 

There's also a way of starting the API and exposing it as an HTTP endpoint to be tested by POSTMAN

```bash
    #Start local API on port 3000
    $ make local-api 
```

### Debug locally `make debug|sam-debug`

Debugging is easier than you might think. Run the following command, it will create a debugging session on port `8997`, put the break points, attach your favourite IDE to the same port and boom!

```bash
    $ make sam-debug network=services_default func=create event=create/event.json
    #OR
    $ make debug network=services_default func=create event=create/event.json
```

-   `func` specified in capital case `Create`
-   `event` path to the event file 
-   `network` is a docker network you need inside which you need to run your lambda as container

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

### Unit Test 

```bash
    $ make test
```
