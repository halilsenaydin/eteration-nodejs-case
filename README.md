# Eteration Node.js Case

This project was developed over a three-day period as part of the Eteration internship.


[Case Definition](https://gitlab.eteration.com/academy/assignments/node-case-study/-/tree/master/case-definition "Case Definition")

[Review Standards](https://gitlab.eteration.com/academy/assignments/node-case-study/-/tree/master/review-standards "Review Standards")

## Preview The Project
[Preview Eteration Node.js Case](https://eteration.kulabuz.com.tr "Preview Eteration Nodejs Case")

## Install Project Dependencies

### Install NVM
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.34.0/install.sh | bash
```

Close and reopen your terminal to start using nvm or run the following to use it now:
```bash
exportNVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

### Install Node.js and Npm
```bash
nvm install node
nvm install --lts
```

### Check Version
```bash
node --version
npm -v
```

## Run Your Local

### Get Project
```bash
mkdir -p ~/projects/eteration && cd ~/projects/eteration
git clone https://github.com/halilsenaydin/eteration-nodejs-case.git
mv eteration-nodejs-case nodejs && cd nodejs
```

### Install node dependencies
```bash
npm install
```

### Run The Project
```bash
npm start
```

### Run The Tests
```bash
npm test
```

## Projects Dependencies
- __Mongoose:__ Requirement For MongoDB Connection Using ORM
- __Express JS:__ Requirement For Create a HTTP Server
- __Jest, Supertest:__ Requirement For Unit and E2E Test
- __awilix__ Requirement For Dependency Injection, IoC Container

