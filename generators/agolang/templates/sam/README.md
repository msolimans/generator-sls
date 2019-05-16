# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally 


```bash
    #Start local API in port 3000
    $ make local-api 
    #Invoke function
    $ make func=FuncName event=/path/to/event.json invoke
    #Using SAM
    $ sam local invoke --event /path/to/event.json FuncName
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

