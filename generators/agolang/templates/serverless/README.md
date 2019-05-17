# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally `make ... local-invoke|sam-invoke`

Not supported by Serverless framework itself, however we wired this up with `lambci/lambda`: 

```bash
    #Start local API in port 3000
    $ make local-api 
    #OR invoke function (using lambci/lambda)  
    $ make func=funcName event=/path/to/event.json local-invoke
    #OR invoke function using SAM [will export to SAM, build and invoke func]
    $ make func=funcName event=/path/to/event.json sam-invoke
```

- `func` specified in capital case `Rest`
- `event` path to the event file 

### Debug locally `make ... sam-debug`

Debugging is easier than you might think. Run the following command, it will create a debugging session on port `8997`, put the break points, attach your favourite IDE to the same port and boom!

```bash
    $ make network=services_default func=Create event=create/event.json sam-debug
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
