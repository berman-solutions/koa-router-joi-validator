# koa-router-joi-validator

### Installation:
> npm install berman-solutions/koa-router-joi-validator

### Usage:
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

router.post('/users', validate(usersSchema), ctx => {
    ctx.body = 'Users route after validation!';
})
```