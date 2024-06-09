const { ApolloError } = require('apollo-server-express');

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sinon = require('sinon');
const createExpressApp = require('../src/app');
const User = require('../src/models/user');
const auth = require('../src/middleware/auth');

let app;
let findOneStub;
let createStub;
beforeAll(async () => {
  mongoose.connection.readyState = 1;
  app = await createExpressApp();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User registration', () => {

  beforeEach(() => {
    findOneStub = sinon.stub(User, 'findOne');
    createStub = sinon.stub(User, 'create');
  });

  afterEach(() => {
    findOneStub.restore();
    createStub.restore();
  });

  it('should return an error if passwords do not match', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            register(username: "testuser", email: "test@example.com", password: "pass123", confirmPassword: "pass1234") {
              id
              username
              email
              token
            }
          }
        `,
      });

    expect(response.body.errors[0].message).toBe('password and confirm password are not matching');
  });

  it('should return an error if the user already exists', async () => {
    findOneStub.resolves({ email: 'test@example.com' });

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            register(username: "testuser", email: "test@example.com", password: "pass123", confirmPassword: "pass123") {
              id
              username
              email
              token
            }
          }
        `,
      });

    expect(response.body.errors[0].message).toBe('User already exists');
  });

  it('should create a new user and return the user data with a token', async () => {
    const fakeUser = { _id: '60d21b4667d0d8992e610c85', username: 'testuser', email: 'test@example.com', password: 'pass123', _doc: { username: 'testuser', email: 'test@example.com', password: 'pass123' } };
    const fakeToken = 'fake-jwt-token';

    findOneStub.resolves(null);
    createStub.resolves(fakeUser);
    const token = "123456788"

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            register(username: "testuser", email: "test@example.com", password: "pass123", confirmPassword: "pass123") {
              id
              username
              email
              token
            }
          }
        `,
      });
      expect(response.statusCode).toEqual(200);
  });
});

describe('User Login', () => {

  beforeEach(() => {
    findOneStub = sinon.stub(User, 'findOne');
  });

  afterEach(() => {
    findOneStub.restore();
  });



  it('should return an error if the user not exists', async () => {
    findOneStub.resolves(null);

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(email: "test@example.com", password: "pass123") {
              id
              username
              email
              token
            }
          }
        `,
      });

    expect(response.body.errors[0].message).toBe('User not found');
  });

  it('should user login with wrong password', async () => {
    const fakeUser = { _id: '60d21b4667d0d8992e610c85', username: 'testuser', email: 'test@example.com', password: 'pass123', _doc: { username: 'testuser', email: 'test@example.com', password: 'pass123' }, comparePassword: () => false };
    // const fakeToken = 'fake-jwt-token';

    findOneStub.resolves(fakeUser);

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(email: "test@example.com", password: "pass123") {
              id
              username
              email
              token
            }
          }
        `,
      });
      expect(response.body.errors[0].message).toBe('Invalid credentials');

  });
  it('should user login with correct password the user data with a token', async () => {
    const fakeUser = { _id: '60d21b4667d0d8992e610c85', username: 'testuser', email: 'test@example.com', password: 'pass123', _doc: { username: 'testuser', email: 'test@example.com', password: 'pass123' }, comparePassword: () => true };
    // const fakeToken = 'fake-jwt-token';

    findOneStub.resolves(fakeUser);

    const response = await request(app)
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(email: "test@example.com", password: "pass123") {
              id
              username
              email
              token
            }
          }
        `,
      });
      expect(response.statusCode).toEqual(200);
  });
});



let jwtStub;
let findByIdStub;
describe('Me User with Token', () => {

  beforeEach(() => {
    findByIdStub = sinon.stub(User, 'findById');
    jwtStub =  sinon.stub(jwt, "verify");
  });

  afterEach(() => {
    findByIdStub.restore();
    jwtStub.restore();
  });

  it('should return an error if the token is expired', async () => {

    jwtStub.throws(new ApolloError('Invalid token' , "401"));
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
      .post('/graphql').set('authorization', `${token}`)
      .send({
        query: `
          query {
            me{
              id
              username
              email
              token
            }
          }
        `,
      });
      // console.log(response.body,">>>>>>.s");
    // expect(response.statusCode).toEqual(401);
    expect(response.body.errors[0].message).toBe('Invalid or expired token');
  });

  it('should return an error if the user not exists', async () => {
    const payload = {
      "id": "6661c58abd942a2da55cd3ed",
      "email": "v1j@gmail.com",
      "username": "vetti1j",
      "iat": 1717683594,
      "exp": 1717769994
    };
    jwtStub.returns(payload);
    const fakeUser = { _id: '60d21b4667d0d8992e610c85', username: 'testuser', email: 'test@example.com', password: 'pass123', _doc: { username: 'testuser', email: 'test@example.com', password: 'pass123' }, comparePassword: () => true };
    findByIdStub.resolves(fakeUser);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
      .post('/graphql').set('authorization', `${token}`)
      .send({
        query: `
          query {
            me{
              id
              username
              email
              token
            }
          }
        `,
      });
    expect(response.statusCode).toEqual(200);
  });
});
let bcryptCompareStub;
describe("User model methods test suite", ()=>{
  beforeEach(() => {
    jwtStub = sinon.stub(jwt, 'verify');
    bcryptCompareStub = sinon.stub(bcrypt, 'compare');
  });

  afterEach(() => {
    jwtStub.restore();
    bcryptCompareStub.restore();
  });

  it('should compare passwords correctly', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword'
    });

    bcryptCompareStub.resolves(true);
    const isMatch = await user.comparePassword('plainpassword');
    expect(isMatch).toBe(true);
    expect(user.password).not.toEqual('plainpassword');
  });
})