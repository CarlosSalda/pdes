// src/models/__tests__/user.schema.unit.spec.ts
import { model } from 'mongoose';
import { Role, UserSchema } from '../user.schema';

describe('User Schema (unit)', () => {
  const UserModel = model('User', UserSchema);

  const validate = (doc: Partial<any>) => {
    const user = new UserModel(doc);
    return user.validate().then(
      () => true,
      (err) => {
        throw err;
      },
    );
  };

  it('should reject email', async () => {
    await expect(validate({ password: '12345678' })).rejects.toThrow(
      /`email` is required/,
    );
  });

  it('should reject invalid email', async () => {
    await expect(
      validate({ email: 'no-mail', password: '12345678' }),
    ).rejects.toThrow(/is not a valid email/);
  });

  it('should normalize email', async () => {
    const doc = { email: '  Foo@Bar.COM ', password: '12345678' };
    const user = new UserModel(doc);
    await user.validate();
    expect(user.email).toBe('foo@bar.com');
  });

  it('should assing role USER by default', async () => {
    const doc = { email: 'x@y.com', password: '12345678' };
    const user = new UserModel(doc);
    await user.validate();
    expect(user.role).toBe(Role.USER);
  });
});
