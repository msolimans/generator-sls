# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally

Not supported by Serverless framework itself, however we wired this up with `lambci/lambda`: 


```bash
    #Start local API in port 3000
    $ make local-api 
    #OR invoke function
    $ make func=funcName event=/path/to/event.json invoke
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

### Unit Test 

```bash
    $ make test
```

