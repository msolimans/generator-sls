# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally 

Suppose we have added `rest` handler:

```bash
    #Start local API in port 3000
    $ make local-api 
    #Invoke function (Notice Rest starts with uppercase letter)
    $ make func=Rest event=/rest/event.json local-invoke
    #Using SAM, Notice Function added after Rest here
    $ sam local invoke --event /rest/event.json RestFunction
```

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

