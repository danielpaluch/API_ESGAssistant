import * as Chance from 'chance';
const chance = new Chance();

export const CREATE_USER_OPERATION_NAME = 'CreateUser';
const UPDATED_ROLE_LENGTH = 15;
const ROLE_LENGTH = 20;

export const CREATE_USER_MUTATION = `mutation CreateUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
        _id
        firstName
        lastName
        email
        role
        phone
        company
    }
}`;

export const generateUserVariables = () => {
  return {
    createUserInput: {
      firstName: chance.name(),
      lastName: chance.name(),
      email: chance.email(),
      password: 'FakePassword1?',
      role: chance.string({ length: ROLE_LENGTH }),
      phone: chance.phone(),
      company: chance.company(),
    },
  };
};
