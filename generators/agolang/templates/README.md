# <%= projectName %>
<%= projectDescription %>

## CLI

### Running locally

Uncomment the plugin section in `serverless.yml` then:

```bash
    $ npm run -s local
    # Or
    $ yarn local
```

### Deploy project remotely

```bash
    $ npm run -s deploy
    # Or
    $ yarn deploy
```

### Deploy a function remotely

```bash
    $ sls deploy function -f api --region eu-west-1 
```

### UnDeploy

```bash
    $ npm run -s undeploy
    # Or 
    $ yarn undeploy
```

## Continuous Integration

### Test with mocha

```bash
    $ npm test
    # Or
    $ yarn test
```

### Build JsDoc and Plato

```bash
    $ npm run -s build
    # Or 
    $ yarn build
```

### Run Eslint & security check

```bash
    $ npm run -s lint
    # Or 
    $ yarn lint
```
