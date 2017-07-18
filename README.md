[![Build Status](https://travis-ci.org/berman-solutions/koa-router-joi-validator.svg?branch=master)](https://travis-ci.org/berman-solutions/koa-router-joi-validator)
[![codecov](https://codecov.io/gh/berman-solutions/koa-router-joi-validator/branch/master/graph/badge.svg)](https://codecov.io/gh/berman-solutions/koa-router-joi-validator)
[![Known Vulnerabilities](https://snyk.io/test/github/berman-solutions/koa-router-joi-validator/badge.svg)](https://snyk.io/test/github/berman-solutions/koa-router-joi-validator)
[![dependencies Status](https://david-dm.org/berman-solutions/koa-router-joi-validator/status.svg)](https://david-dm.org/berman-solutions/koa-router-joi-validator)
[![devDependencies Status](https://david-dm.org/berman-solutions/koa-router-joi-validator/dev-status.svg)](https://david-dm.org/berman-solutions/koa-router-joi-validator?type=dev)


# koa-router-joi-validator

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
