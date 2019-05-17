# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally `make ... local-invoke|sam-invoke`

Suppose we have added `rest` handler:

```bash
    #Start local API in port 3000
    $ make local-api 
    #Invoke function (Notice Rest starts with uppercase letter)
    $ make func=Rest event=/rest/event.json local-invoke
    #Using SAM, Notice Function added after Rest here
    $ sam local invoke --event /rest/event.json RestFunction
```

- `func` specified in capital case `Create`
- `event` path to the event file 


### Debug locally `make ... local-debug|sam-debug`

Debugging is easier than you might think. Run the following command, it will create a debugging session on port `8997`, put the break points, attach your favourite IDE to the same port and boom!

```bash
    $ make network=services_default func=Create event=create/event.json sam-debug
```

- `func` specified in capital case `Create`
- `event` path to the event file 
- `network` is a docker network you need inside which you need to run your lambda as container


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

