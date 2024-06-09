
const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const createExpressApp = require('../src/app');
const Supplier = require('../src/models/Supplier');

let app;
let jwtStub;
let createSupplierStub;
let findOneAndUpdateStub;
let deleteOneStub;
let getOneStub;
let getAllStub;

beforeAll(async () => {
  mongoose.connection.readyState = 1;
  app = await createExpressApp();
});

afterAll(async () => {
  await mongoose.connection.close();
});


describe('Supplier Test suite', () => {

  beforeEach(() => {
    createSupplierStub = sinon.stub(Supplier, 'create');
    findOneAndUpdateStub = sinon.stub(Supplier, 'findOneAndUpdate');
    deleteOneStub = sinon.stub(Supplier, 'deleteOne');
    getOneStub = sinon.stub(Supplier, 'findOne');
    getAllStub = sinon.stub(Supplier, 'find');
    jwtStub =  sinon.stub(jwt, "verify");
  });

  afterEach(() => {
    createSupplierStub.restore();
    findOneAndUpdateStub.restore();
    getOneStub.restore();
    deleteOneStub.restore();
    getAllStub.restore();
    jwtStub.restore();
  });

  it('should return supplier data after creation', async () => {
    const payload = {
      "id": "6661c58abd942a2da55cd3ed",
      "email": "v1j@gmail.com",
      "username": "vetti1j",
      "iat": 1717683594,
      "exp": 1717769994
    };
    jwtStub.returns(payload);
    const fakeSupplierData = {
      id: "60d21b4667d0d8992e610c85", 
      supplierName: "Alpha Wholesale",
      contactPerson: "Jane Doe",
      phoneNumber: "+1-800-555-5678",
      emailAddress: "jane.doe@alphawholesale.com",
      user: "6661c58abd942a2da55cd3ed",
      _doc: {
        id: "60d21b4667d0d8992e610c85",
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com",
        user: "6661c58abd942a2da55cd3ed"
      }
    };
    createSupplierStub.resolves(fakeSupplierData);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
    .post('/graphql').set('authorization', `${token}`)
    .send({
      query: `
        mutation AddSupplier($supplierName: String!, $contactPerson: String!, $phoneNumber: String!, $emailAddress: String!) {
          addSupplier(supplierName: $supplierName, contactPerson: $contactPerson, phoneNumber: $phoneNumber, emailAddress: $emailAddress) {
            id
            supplierName
            contactPerson
            phoneNumber
            emailAddress
          }
        }
      `,
      variables: {
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com"
      }
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body.data.addSupplier).toEqual({
        id: '60d21b4667d0d8992e610c85', 
        supplierName: 'Alpha Wholesale',
        contactPerson: 'Jane Doe',
        phoneNumber: '+1-800-555-5678',
        emailAddress: 'jane.doe@alphawholesale.com'
      }); 
  });
  it('should return supplier data after updation', async () => {
    const payload = {
      "id": "6661c58abd942a2da55cd3ed",
      "email": "v1j@gmail.com",
      "username": "vetti1j",
      "iat": 1717683594,
      "exp": 1717769994
    };
    jwtStub.returns(payload);
    const fakeSupplierData = {
      id: "60d21b4667d0d8992e610c85", 
      supplierName: "Alpha Wholesale",
      contactPerson: "Jane Doe",
      phoneNumber: "+1-800-555-5678",
      emailAddress: "jane.doe@alphawholesale.com",
      user: "6661c58abd942a2da55cd3ed",
      _doc: {
        id: "60d21b4667d0d8992e610c85",
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com",
        user: "6661c58abd942a2da55cd3ed"
      }
    };
    findOneAndUpdateStub.resolves(fakeSupplierData);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
      .post("/graphql")
      .set("authorization", `${token}`)
      .send({
        query: `mutation UpdateSupplier($updateSupplierId: ID!, $supplierName: String, $contactPerson: String, $phoneNumber: String, $emailAddress: String) {
      updateSupplier(id: $updateSupplierId, supplierName: $supplierName, contactPerson: $contactPerson, phoneNumber: $phoneNumber, emailAddress: $emailAddress) {
        id,
        supplierName,
        contactPerson,
        phoneNumber,
        emailAddress
      }
    }`,
        variables: {
          updateSupplierId: "60d21b4667d0d8992e610c85",
          supplierName: "Global Supplies Ltd.",
          contactPerson: "John Smith",
          phoneNumber: "+1-800-555-1234",
          emailAddress: "john.smith@globalsupplies.com",
        },
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.data.updateSupplier).toEqual({
        id: '60d21b4667d0d8992e610c85', 
        supplierName: 'Alpha Wholesale',
        contactPerson: 'Jane Doe',
        phoneNumber: '+1-800-555-5678',
        emailAddress: 'jane.doe@alphawholesale.com'
      }); 
  });
  it('should return supplier data after deletion', async () => {
    const payload = {
      "id": "6661c58abd942a2da55cd3ed",
      "email": "v1j@gmail.com",
      "username": "vetti1j",
      "iat": 1717683594,
      "exp": 1717769994
    };
    jwtStub.returns(payload);
    const fakeSupplierData = {
      id: "60d21b4667d0d8992e610c85", 
      supplierName: "Alpha Wholesale",
      contactPerson: "Jane Doe",
      phoneNumber: "+1-800-555-5678",
      emailAddress: "jane.doe@alphawholesale.com",
      user: "6661c58abd942a2da55cd3ed",
      _doc: {
        id: "60d21b4667d0d8992e610c85",
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com",
        user: "6661c58abd942a2da55cd3ed"
      }
    };
    deleteOneStub.resolves(fakeSupplierData);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
      .post("/graphql")
      .set("authorization", `${token}`)
      .send({
        query: `mutation DeleteSupplier($deleteSupplierId: ID!) {
      deleteSupplier(id: $deleteSupplierId)}`,
        variables: {"deleteSupplierId":"666301015c150b6077e5f988"}
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.data.deleteSupplier).toEqual("Supplier deleted successfully"); 
  });

  it('should return supplier data with Id ', async () => {
    const payload = {
      "id": "6661c58abd942a2da55cd3ed",
      "email": "v1j@gmail.com",
      "username": "vetti1j",
      "iat": 1717683594,
      "exp": 1717769994
    };
    jwtStub.returns(payload);
    const fakeSupplierData = {
      id: "60d21b4667d0d8992e610c85", 
      supplierName: "Alpha Wholesale",
      contactPerson: "Jane Doe",
      phoneNumber: "+1-800-555-5678",
      emailAddress: "jane.doe@alphawholesale.com",
      user: "6661c58abd942a2da55cd3ed",
      _doc: {
        id: "60d21b4667d0d8992e610c85",
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com",
        user: "6661c58abd942a2da55cd3ed"
      }
    };
    getOneStub.resolves(fakeSupplierData);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
    .post('/graphql').set('authorization', `${token}`)
    .send({
        query: `query GetSupplierById($getSupplierByIdId: ID!) {
      getSupplierById(id: $getSupplierByIdId) {
      id,
      contactPerson,
      emailAddress,
      phoneNumber,
      supplierName  
      }
    }`,
        variables: {"getSupplierByIdId":"6662fde4fa1138c5e90d954a"}
      });
    expect(response.statusCode).toEqual(200);
    expect(response.body.data.getSupplierById).toEqual({
        id: '60d21b4667d0d8992e610c85', 
        supplierName: 'Alpha Wholesale',
        contactPerson: 'Jane Doe',
        phoneNumber: '+1-800-555-5678',
        emailAddress: 'jane.doe@alphawholesale.com'
      }); 
  });
  it('should return all suppliers data ', async () => {
    const payload = {
      "id": "6661c58abd942a2da55cd3ed",
      "email": "v1j@gmail.com",
      "username": "vetti1j",
      "iat": 1717683594,
      "exp": 1717769994
    };
    jwtStub.returns(payload);
    const fakeSupplierData = [{
      id: "60d21b4667d0d8992e610c85", 
      supplierName: "Alpha Wholesale",
      contactPerson: "Jane Doe",
      phoneNumber: "+1-800-555-5678",
      emailAddress: "jane.doe@alphawholesale.com",
      user: "6661c58abd942a2da55cd3ed",
      _doc: {
        id: "60d21b4667d0d8992e610c85",
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com",
        user: "6661c58abd942a2da55cd3ed"
      }
    },
    {
        id: "60d21b4667d0d8992e610c85", 
        supplierName: "Alpha Wholesale",
        contactPerson: "Jane Doe",
        phoneNumber: "+1-800-555-5678",
        emailAddress: "jane.doe@alphawholesale.com",
        user: "6661c58abd942a2da55cd3ed",
        _doc: {
          id: "60d21b4667d0d8992e610c85",
          supplierName: "Alpha Wholesale",
          contactPerson: "Jane Doe",
          phoneNumber: "+1-800-555-5678",
          emailAddress: "jane.doe@alphawholesale.com",
          user: "6661c58abd942a2da55cd3ed"
        }
      }];
    getAllStub.resolves(fakeSupplierData);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const response = await request(app)
    .post('/graphql').set('authorization', `${token}`)
    .send({
        query: `query GetSuppliers {
      getSuppliers {
      id,
      supplierName,
      contactPerson,
      emailAddress,
      }
    }`,
        variables: {}
      });
    expect(response.statusCode).toEqual(200);
  });
});
