// src/models/__tests__/user.schema.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { Role, User, UserDocument, UserSchema } from '../user.schema';

jest.setTimeout(60_000);

describe('User Schema', () => {
  let mongoServer: MongoMemoryServer | undefined;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create({
      binary: {
        version: '7.0.14',
        downloadDir: './.cache/mongodb-memory-server',
      },
    });
    const uri = mongoServer.getUri();

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri, {}),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
    }).compile();

    userModel = moduleRef.get<Model<UserDocument>>(getModelToken(User.name));
  }, 60_000);

  afterEach(async () => {
    if (userModel) {
      await userModel.deleteMany({});
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('should assign default role USER', async () => {
    const user = await userModel.create({
      email: 'test@example.com',
      password: 'secret123',
    });
    expect(user.role).toBe(Role.USER);
  });

  it('should allow setting role to ADMIN', async () => {
    const user = await userModel.create({
      email: 'admin@example.com',
      password: 'adminpass',
      role: Role.ADMIN,
    });
    expect(user.role).toBe(Role.ADMIN);
  });

  it('should trim and lowercase email', async () => {
    const user = await userModel.create({
      email: '  TEST@Example.COM ',
      password: '12345678',
    });
    expect(user.email).toBe('test@example.com');
  });

  it('should reject missing email or password', async () => {
    await expect(userModel.create({})).rejects.toThrow();
    await expect(userModel.create({ email: 'x@y.com' })).rejects.toThrow();
    await expect(userModel.create({ password: '12345678' })).rejects.toThrow();
  });

  it('should allow empty reviews by default', async () => {
    const user = await userModel.create({
      email: 'x@x.com',
      password: '12345678',
    });
    expect(user.reviews).toEqual([]);
  });
});
