# dojima-hackathon

#### Setup genesis

#### Make sure your node version is >12.0.0

Setup genesis whenever contracts get changed
### 1. Install dependencies and submodules
```bash
$ npm install

```

### 2. Compile contracts
```bash
#installation of npm v12.0.0 is required
$ npm run truffle:compile
```

### 3. Run Test Blockchain
```bash
$ npm run testrpc
$ npm test
```

### 4. Migrate Contracts to local chain
```bash
$ npm run truffle:migrate
```

### 5. Migrate Contracts to dojima chain
```bash
$ truffle migrate --network dojimachain
```


### PR Submission Guidelines

1. Fork `dojima-hackathon` repository
2. Create a new folder with `team-name` inside ``hackathon/<hackathon-name>`` folder in main branch
3. Copy your entire project repository and add a `README` file.
4. `README` file should contain the following:
```markdown
1. Project name and its members
2. Description
3. Tag-line (if-any)
4. Logo (optional)
5. Steps to follow for testing the project
```
