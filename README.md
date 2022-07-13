[![Build Status](https://travis-ci.org/berman-solutions/koa-router-joi-validator.svg?branch=master)](https://travis-ci.org/berman-solutions/koa-router-joi-validator)
[![codecov](https://codecov.io/gh/berman-solutions/koa-router-joi-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/berman-solutions/koa-router-joi-validator)
[![npm version](https://badge.fury.io/js/koa-router-joi-validator.svg)](https://badge.fury.io/js/koa-router-joi-validator)
[![Known Vulnerabilities](https://snyk.io/test/github/berman-solutions/koa-router-joi-validator/badge.svg)](https://snyk.io/test/github/berman-solutions/koa-router-joi-validator)


# koa-router-joi-validator
### Koa Middleware for route validation using Joi with super simple JSON schemas !

## Install:
```
npm i koa-router-joi-validator
```
if you are using yarn:
```
yarn add koa-router-joi-validator
```

## Usage:
```javascript
import { validator } from 'koa-router-joi-validator';

const usersSchema = {
    id: {
        type: 'number',
        options: { integer: true, max: 10 }
    },
    username: {
        type: 'string',
        options: { required: true }
    }
};

router.post('/users', validator(usersSchema), ctx => {
    ctx.body = 'Users route after validation!';
})
```
