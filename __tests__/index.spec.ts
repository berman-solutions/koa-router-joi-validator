import { validator } from '../src/index';

describe('validator', () => {
  describe('valid schema', () => {
    test('should call next()', () => {
      const schema = {
        id: { type: 'number', options: { integer: true } }
      };
      const middleware = validator(schema);
      const next = jest.fn();
      const ctx = {
        body: null,
        request: { body: { id: 3 } }
      };
      middleware(ctx, next);
      expect(next.mock.calls.length).toBe(1);
    });
    test('should ignore parameter with false value', () => {
      const schema = {
        id: { type: 'number', options: { integer: false } }
      };
      const middleware = validator(schema);
      const ctx = {
        body: null,
        request: { body: { id: '123' } }
      };
      const next = jest.fn();
      middleware(ctx, next);
      expect(next.mock.calls.length).toBe(1);
    });
  });
  describe('invalid schema', () => {
    test('should fail on incorrect max number', () => {
      const schema = {
        id: { type: 'number', options: { max: 1 } }
      };
      const middleware = validator(schema);
      const ctx = {
        body: null,
        request: { body: { id: 13 } }
      };
      middleware(ctx);
      expect(ctx.body.name).toBe('ValidationError');
      expect(ctx.body.details[0].type).toBe('number.max');
    });
    test('should throw when schema is undefined or null', () => {
      expect(validator).toThrowError('Schema cannot be empty.');
    });
  });
  describe('broken request', () => {
    test('should throw if request is empty', () => {
      const schema = {
        id: { type: 'number', options: { max: 1 } }
      };
      const middleware = validator(schema);
      expect(middleware).toThrowError('Request cannot be empty.');
    });
  });
});
