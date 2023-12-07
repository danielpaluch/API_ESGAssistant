import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import {
  CREATE_USER_MUTATION,
  CREATE_USER_OPERATION_NAME,
  generateCreateUserVariables,
} from '../src/app/common/helpers/create-user.helper';
import { GRAPHQL_ENDPOINT } from '../src/app/common/helpers/graphql.helper';
import { User } from '../src/app/user/entities/user.entity';

jest.setTimeout(70000);

describe('UserResolver (e2e)', () => {
  let app: INestApplication;
  let user: User;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a user with user mutation', () => {
    const createUserInput = generateCreateUserVariables().createUserInput;
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .send({
        operationName: CREATE_USER_OPERATION_NAME,
        query: CREATE_USER_MUTATION,
        variables: { createUserInput },
      })
      .expect(200)
      .expect((res) => {
        user = res.body.data.createUser;
        expect(user).toBeDefined();
        expect(user.firstName).toBe(createUserInput.firstName);
        expect(user.lastName).toBe(createUserInput.lastName);
        expect(user.email).toBe(createUserInput.email);
      });
  });
});
