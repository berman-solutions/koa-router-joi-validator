import { validator } from '../';

describe('validator', () => {
  let usersSchema = null;
  beforeEach(() => {
    usersSchema = {
      id: {
        type: 'number',
        options: { integer: true, max: 10 }
      },
      username: {
        type: 'string',
        options: { required: true }
      }
    };
  });
  test('validate should call next() ones', () => {
    const middleware = validator(usersSchema);
    const next = jest.fn();
    const ctx = {
      body: null,
      request: {
        body: {
          id: 3,
          username: 'tobi'
        }
      }
    };
    middleware(ctx, next);
    expect(next.mock.calls.length).toBe(1);
  });
  test('should return an error to ctx.body', () => {
    const middleware = validator(usersSchema);
    const ctx = {
      body: null,
      request: {
        body: {
          id: 13,
          username: 'tobi'
        }
      }
    };
    middleware(ctx);
    expect(ctx.body.name).toBe('ValidationError');
  });
});
