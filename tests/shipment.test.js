const connectDB =  require('../src/config/db')

const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const createExpressApp = require('../src/app');
const Shipment = require('../src/models/shipment');
const auth = require('../src/middleware/auth');

let app;
let jwtStub;
let createStub;
let findOneAndUpdateStub;
let findOneStub;
let findStub;
beforeAll(async () => {
    mongoose.connection.readyState = 1;
    app = await createExpressApp();
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
});

describe('Invenory Test suite', () => {

    beforeEach(() => {
      createStub = sinon.stub(Shipment, 'create');
      findOneAndUpdateStub = sinon.stub(Shipment, 'findOneAndUpdate');
      // findByIdAndDeleteStub = sinon.stub(Shipment, 'findByIdAndDelete');
      findOneStub = sinon.stub(Shipment, 'findOne');
      findStub = sinon.stub(Shipment, 'find');
      jwtStub =  sinon.stub(jwt, "verify");
      const payload = {
          "id": "6661c58abd942a2da55cd3ed",
          "email": "v1j@gmail.com",
          "username": "vetti1j",
          "iat": 1717683594,
          "exp": 1717769994
        };
      jwtStub.returns(payload);
    });
  
    afterEach(() => {
      createStub.restore();
      findOneAndUpdateStub.restore();
      // findByIdAndDeleteStub.restore();
      findOneStub.restore();
      findStub.restore();
      jwtStub.restore();
    });
  
    it('should create a new shipment and return the item data', async () => {

      const payload = {
          "id": "6661c58abd942a2da55cd3ed",
          "email": "v1j@gmail.com",
          "username": "vetti1j",
          "iat": 1717683594,
          "exp": 1717769994
        };
      jwtStub.returns(payload);
      const fakeInventoryItemIds = ['60d21b4667d0d8992e610c86', '60d21b4667d0d8992e610c87'];
      const fakeShipment = {
        id: '60d21b4667d0d8992e610c88',
        origin: 'Warehouse A',
        destination: 'Warehouse B',
        status: 'In Transit',
        estimatedDeliveryDate: '2023-12-31',
        // inventoryItems: fakeInventoryItemIds.map(id => new mongoose.Types.ObjectId(id)),
        inventoryItems: fakeInventoryItemIds.map(id => id),
      };
      createStub.returns({
        populate: sinon.stub().resolves(fakeShipment)
  });
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
      
      const response = await request(app)
        .post('/graphql')
        .set('authorization', `${token}`)
        .send({
          query: `mutation AddShipment($origin: String!, $destination: String!, $status: String!, $estimatedDeliveryDate: String!, $inventoryItemIds: [ID!]) {
        addShipment(origin: $origin, destination: $destination, status: $status, estimatedDeliveryDate: $estimatedDeliveryDate, inventoryItemIds: $inventoryItemIds) {
          id
          origin
          destination
          status
          estimatedDeliveryDate
        }
      }`,
          variables: {"origin":"New York, NY","destination":"Los Angeles, CA","status":"In Transit","estimatedDeliveryDate":"2024-06-15","inventoryItemIds":["6663037889cd78fe1fb5c925","6663039d89cd78fe1fb5c927"]}
        });
        expect(response.body.data.addShipment).toEqual({
          id: fakeShipment.id.toString(),
          origin: fakeShipment.origin,
          destination: fakeShipment.destination,
          status: fakeShipment.status,
          estimatedDeliveryDate: fakeShipment.estimatedDeliveryDate,
        });
    });
    it('should update a existing shipment and return the item data', async () => {

      const payload = {
          "id": "6661c58abd942a2da55cd3ed",
          "email": "v1j@gmail.com",
          "username": "vetti1j",
          "iat": 1717683594,
          "exp": 1717769994
        };
      jwtStub.returns(payload);
      const fakeInventoryItemIds = ['60d21b4667d0d8992e610c86', '60d21b4667d0d8992e610c87'];
      const fakeShipment = {
        id: '60d21b4667d0d8992e610c88',
        origin: 'Warehouse A',
        destination: 'Warehouse B',
        status: 'In Transit',
        estimatedDeliveryDate: '2023-12-31',
        // inventoryItems: fakeInventoryItemIds.map(id => new mongoose.Types.ObjectId(id)),
        inventoryItems: fakeInventoryItemIds.map(id => id),
      };
      findOneAndUpdateStub.returns({
        populate: sinon.stub().resolves(fakeShipment)
  });
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
      
      const response = await request(app)
        .post('/graphql')
        .set('authorization', `${token}`)
        .send({
          query: `mutation UpdateShipment($updateShipmentId: ID!, $status: String!) {
        updateShipment(id: $updateShipmentId, status: $status) {
          id
          origin
          destination
          status
          estimatedDeliveryDate
        }
      }`,
          variables: {"updateShipmentId":"6663246080f32888e83bc539","status":"Delay"}
        });
        expect(response.body.data.updateShipment).toEqual({
          id: fakeShipment.id.toString(),
          origin: fakeShipment.origin,
          destination: fakeShipment.destination,
          status: fakeShipment.status,
          estimatedDeliveryDate: fakeShipment.estimatedDeliveryDate,
        });
    });
    it('should single shipment by id and return the item data', async () => {

      const payload = {
          "id": "6661c58abd942a2da55cd3ed",
          "email": "v1j@gmail.com",
          "username": "vetti1j",
          "iat": 1717683594,
          "exp": 1717769994
        };
      jwtStub.returns(payload);
      const fakeInventoryItemIds = ['60d21b4667d0d8992e610c86', '60d21b4667d0d8992e610c87'];
      const fakeShipment = {
        id: '60d21b4667d0d8992e610c88',
        origin: 'Warehouse A',
        destination: 'Warehouse B',
        status: 'In Transit',
        estimatedDeliveryDate: '2023-12-31',
        inventoryItems: fakeInventoryItemIds.map(id => id),
      };
      findOneStub.returns({
        populate: sinon.stub().resolves(fakeShipment)
  });
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
      
      const response = await request(app)
        .post('/graphql')
        .set('authorization', `${token}`)
        .send({
          query: `query GetShipmentById($getShipmentByIdId: ID!) {
        getShipmentById(id: $getShipmentByIdId) {
          id
          origin
          destination
          status
          estimatedDeliveryDate
        }
      }`,
          variables: {"getShipmentByIdId":"66631ed30b6673b4752bb4bc"}
        });
        expect(response.body.data.getShipmentById).toEqual({
          id: fakeShipment.id.toString(),
          origin: fakeShipment.origin,
          destination: fakeShipment.destination,
          status: fakeShipment.status,
          estimatedDeliveryDate: fakeShipment.estimatedDeliveryDate,
        });
    });
    it('should all shipments and return the item data', async () => {

      const payload = {
          "id": "6661c58abd942a2da55cd3ed",
          "email": "v1j@gmail.com",
          "username": "vetti1j",
          "iat": 1717683594,
          "exp": 1717769994
        };
      jwtStub.returns(payload);
      const fakeInventoryItemIds = ['60d21b4667d0d8992e610c86', '60d21b4667d0d8992e610c87'];
      const fakeShipment = [{
        id: '60d21b4667d0d8992e610c88',
        origin: 'Warehouse A',
        destination: 'Warehouse B',
        status: 'In Transit',
        estimatedDeliveryDate: '2023-12-31',
        inventoryItems: fakeInventoryItemIds.map(id => id),
      }];
      findStub.returns({
        skip: sinon.stub().returns({
          limit: sinon.stub().returns({
            populate: sinon.stub().resolves(fakeShipment),
          }),
        }),
      });
      const token =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
      
      const response = await request(app)
        .post('/graphql')
        .set('authorization', `${token}`)
        .send({
          query: `query GetShipments($page: Int, $limit: Int) {
        getShipments(page: $page, limit: $limit) {
          id
          origin
          destination
          status
          estimatedDeliveryDate
        }
      }`,
          variables: {"page":1,"limit":10}
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200)
        // expect(response.body.data.getShipmentById).toEqual([{
        //   id: fakeShipment[0].id.toString(),
        //   origin: fakeShipment[0].origin,
        //   destination: fakeShipment[0].destination,
        //   status: fakeShipment[0].status,
        //   estimatedDeliveryDate: fakeShipment[0].estimatedDeliveryDate,
        // }]);
    });
  });

