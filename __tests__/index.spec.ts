import { validator } from '../';

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
  });
});
