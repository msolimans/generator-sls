# <%= projectName %>
<%= projectDescription %>

## CLI

### Build project 

```bash
    $ make 
```

OR 

```bash
    $ gradle build
```

### Deploy project remotely

```bash
    $ sls deploy
```

### Deploy a function remotely

```bash
    $ sls deploy function -f api --region eu-west-1 
```

### UnDeploy or Destroy Lambda Deployment

```bash
    $ sls remove
```
