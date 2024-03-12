## Description

If you want to start the project, create a new file called ".dev.env" with the following variables

```bash
# database host
$ HOST = YOUR_DB_HOST
# database port
$ PORT = YOUR_DB_PORT
# database username
$ USERDB = YOUR_DB_USERNAME
# database password
$ PASSWORD = YOUR_DB_PASSWORD
# database name
$ DATABASE = YOUR_DB_NAME
# secretword jwt
$ JWT_SECRET = YOUR_JWT_SECRET
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
