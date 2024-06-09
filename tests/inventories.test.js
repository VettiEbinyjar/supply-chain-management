const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const createExpressApp = require('../src/app');
const Invenory = require('../src/models/Inventory');
const auth = require('../src/middleware/auth');
const { populate } = require('../src/models/Supplier');

let app;
let jwtStub;
let createInvenoryStub;
let findOneAndUpdateStub;
let findByIdAndDeleteStub;
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
    createInvenoryStub = sinon.stub(Invenory, 'create');
    findOneAndUpdateStub = sinon.stub(Invenory, 'findOneAndUpdate');
    findByIdAndDeleteStub = sinon.stub(Invenory, 'findByIdAndDelete');
    findOneStub = sinon.stub(Invenory, 'findOne');
    findStub = sinon.stub(Invenory, 'find');
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
    createInvenoryStub.restore();
    findOneAndUpdateStub.restore();
    findByIdAndDeleteStub.restore();
    findOneStub.restore();
    findStub.restore();
    jwtStub.restore();
  });

  it('should create a new inventory item and return the item data with supplier details', async () => {
    const fakeSupplier = {
      id: '666302fafe4da709444a5373',
      supplierName: 'Alpha Wholesale',
      contactPerson: 'Jane Doe',
      phoneNumber: '+1-800-555-5678',
      emailAddress: 'jane.doe@alphawholesale.com',
    };
    
    const fakeInventoryItem = {
      id: '60d21b4667d0d8992e610c86',
      itemName: 'Wireless Mouse',
      sku: 'WM-12345',
      quantity: 150,
      warehouseLocation: 'A1-01',
      supplier: fakeSupplier,
      populate: sinon.stub().resolvesThis(),
    };
    const payload = {
        "id": "6661c58abd942a2da55cd3ed",
        "email": "v1j@gmail.com",
        "username": "vetti1j",
        "iat": 1717683594,
        "exp": 1717769994
      };
    jwtStub.returns(payload);
    createInvenoryStub.resolves(fakeInventoryItem);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    
    const response = await request(app)
      .post('/graphql')
      .set('authorization', `${token}`)
      .send({
        query: `
          mutation AddInventoryItem($itemName: String!, $sku: String!, $quantity: Int!, $warehouseLocation: String!, $supplierId: ID!) {
            addInventoryItem(itemName: $itemName, sku: $sku, quantity: $quantity, warehouseLocation: $warehouseLocation, supplierId: $supplierId) {
              id
              itemName
              sku
              quantity
              warehouseLocation
              supplier {
                id
                contactPerson
                emailAddress
                phoneNumber
                supplierName
              }
            }
          }
        `,
        variables: {
          itemName: 'Wireless Mouse',
          sku: 'WM-12345',
          quantity: 150,
          warehouseLocation: 'A1-01',
          supplierId: '666302fafe4da709444a5373',
        },
      });
    expect(response.body.data.addInventoryItem).toEqual({
      id: fakeInventoryItem.id,
      itemName: fakeInventoryItem.itemName,
      sku: fakeInventoryItem.sku,
      quantity: fakeInventoryItem.quantity,
      warehouseLocation: fakeInventoryItem.warehouseLocation,
      supplier: {
        id: fakeSupplier.id,
        contactPerson: fakeSupplier.contactPerson,
        emailAddress: fakeSupplier.emailAddress,
        phoneNumber: fakeSupplier.phoneNumber,
        supplierName: fakeSupplier.supplierName,
      },
    });
  });
  it('should update an existing inventory item and return the updated item data', async () => {
    const fakeInventoryItem = {
      id: '60d21b4667d0d8992e610c86',
      itemName: 'Wireless Mouse',
      sku: 'WM-12345',
      quantity: 150,
      warehouseLocation: 'A1-01',
      supplier: {
        id: '666302fafe4da709444a5373',
        supplierName: 'Alpha Wholesale',
        contactPerson: 'Jane Doe',
        phoneNumber: '+1-800-555-5678',
        emailAddress: 'jane.doe@alphawholesale.com',
      }
    };

    const payload = {
        "id": "6661c58abd942a2da55cd3ed",
        "email": "v1j@gmail.com",
        "username": "vetti1j",
        "iat": 1717683594,
        "exp": 1717769994
      };
    jwtStub.returns(payload);
    findOneAndUpdateStub.resolves(fakeInventoryItem);
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";

    const response = await request(app)
      .post('/graphql')
      .set('authorization', `${token}`)
      .send({
        query: `
          mutation UpdateInventoryItem($id: ID!, $itemName: String!, $sku: String!, $quantity: Int!, $warehouseLocation: String!, $supplierId: ID!) {
            updateInventoryItem(id: $id, itemName: $itemName, sku: $sku, quantity: $quantity, warehouseLocation: $warehouseLocation, supplierId: $supplierId) {
              id
              itemName
              sku
              quantity
              warehouseLocation
              supplier {
                id
                supplierName
                contactPerson
                phoneNumber
                emailAddress
              }
            }
          }
        `,
        variables: {
          id: '60d21b4667d0d8992e610c86',
          itemName: 'Wireless Mouse',
          sku: 'WM-12345',
          quantity: 150,
          warehouseLocation: 'A1-01',
          supplierId: '666302fafe4da709444a5373',
        },
      });

    expect(response.body.data.updateInventoryItem).toEqual({
      id: fakeInventoryItem.id,
      itemName: fakeInventoryItem.itemName,
      sku: fakeInventoryItem.sku,
      quantity: fakeInventoryItem.quantity,
      warehouseLocation: fakeInventoryItem.warehouseLocation,
      supplier: {
        id: fakeInventoryItem.supplier.id,
        supplierName: fakeInventoryItem.supplier.supplierName,
        contactPerson: fakeInventoryItem.supplier.contactPerson,
        phoneNumber: fakeInventoryItem.supplier.phoneNumber,
        emailAddress: fakeInventoryItem.supplier.emailAddress,
      }
    });
  });
  it('should delete an existing inventory item and return a success message', async () => {
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";
    const payload = {
        "id": "6661c58abd942a2da55cd3ed",
        "email": "v1j@gmail.com",
        "username": "vetti1j",
        "iat": 1717683594,
        "exp": 1717769994
      };
    jwtStub.returns(payload);
    findByIdAndDeleteStub.resolves(true);

    const response = await request(app)
      .post('/graphql')
      .set('authorization', `${token}`)
      .send({
        query: `
          mutation DeleteInventoryItem($id: ID!) {
            deleteInventoryItem(id: $id)
          }
        `,
        variables: {
          id: '60d21b4667d0d8992e610c86',
        },
      });
    expect(response.body.data.deleteInventoryItem).toBe('Inventory Item Removed Successfully');
  });
  it('should return a list of inventory items for the authenticated user', async () => {
    const fakeInventoryItems = [
      {
        id: '60d21b4667d0d8992e610c86',
        itemName: 'Wireless Mouse',
        sku: 'WM-12345',
        quantity: 150,
        warehouseLocation: 'A1-01',
        supplier: {
          id: '666302fafe4da709444a5373',
          supplierName: 'Alpha Wholesale',
          contactPerson: 'Jane Doe',
          phoneNumber: '+1-800-555-5678',
          emailAddress: 'jane.doe@alphawholesale.com',
        },
      },
      {
        id: '60d21b4667d0d8992e610c87',
        itemName: 'Keyboard',
        sku: 'KB-12345',
        quantity: 100,
        warehouseLocation: 'A1-02',
        supplier: {
          id: '666302fafe4da709444a5373',
          supplierName: 'Alpha Wholesale',
          contactPerson: 'Jane Doe',
          phoneNumber: '+1-800-555-5678',
          emailAddress: 'jane.doe@alphawholesale.com',
        },
      },
    ];
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";

    findStub.returns({
      skip: sinon.stub().returns({
        limit: sinon.stub().returns({
          populate: sinon.stub().resolves(fakeInventoryItems),
        }),
      }),
    });

    const response = await request(app)
      .post('/graphql')
      .set('Authorization', `${token}`)
      .send({
        query: `
          query GetInventoryItems($page: Int, $limit: Int) {
            getInventoryItems(page: $page, limit: $limit) {
              id
              itemName
              sku
              quantity
              warehouseLocation
              supplier {
                id
                supplierName
                contactPerson
                phoneNumber
                emailAddress
              }
            }
          }
        `,
        variables: {
          page: 1,
          limit: 10,
        },
      });

    expect(response.body.data.getInventoryItems).toEqual([
      {
        id: fakeInventoryItems[0].id,
        itemName: fakeInventoryItems[0].itemName,
        sku: fakeInventoryItems[0].sku,
        quantity: fakeInventoryItems[0].quantity,
        warehouseLocation: fakeInventoryItems[0].warehouseLocation,
        supplier: {
          id: fakeInventoryItems[0].supplier.id,
          supplierName: fakeInventoryItems[0].supplier.supplierName,
          contactPerson: fakeInventoryItems[0].supplier.contactPerson,
          phoneNumber: fakeInventoryItems[0].supplier.phoneNumber,
          emailAddress: fakeInventoryItems[0].supplier.emailAddress,
        },
      },
      {
        id: fakeInventoryItems[1].id,
        itemName: fakeInventoryItems[1].itemName,
        sku: fakeInventoryItems[1].sku,
        quantity: fakeInventoryItems[1].quantity,
        warehouseLocation: fakeInventoryItems[1].warehouseLocation,
        supplier: {
          id: fakeInventoryItems[1].supplier.id,
          supplierName: fakeInventoryItems[1].supplier.supplierName,
          contactPerson: fakeInventoryItems[1].supplier.contactPerson,
          phoneNumber: fakeInventoryItems[1].supplier.phoneNumber,
          emailAddress: fakeInventoryItems[1].supplier.emailAddress,
        },
      },
    ]);
  });
  it('should return inventory item by id for the authenticated user', async () => {
    const fakeInventoryItem =
      {
        id: '60d21b4667d0d8992e610c86',
        itemName: 'Wireless Mouse',
        sku: 'WM-12345',
        quantity: 150,
        warehouseLocation: 'A1-01',
        supplier: {
          id: '666302fafe4da709444a5373',
          supplierName: 'Alpha Wholesale',
          contactPerson: 'Jane Doe',
          phoneNumber: '+1-800-555-5678',
          emailAddress: 'jane.doe@alphawholesale.com',
        },
      };
    const token =  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjFjNThhYmQ5NDJhMmRhNTVjZDNlZCIsImVtYWlsIjoidjFqQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoidmV0dGkxaiIsImlhdCI6MTcxNzY4MzU5NCwiZXhwIjoxNzE3NzY5OTk0fQ.P1D4UW5kKLrSXK5t9b_IflWmEexxHL6E6SikRTo8TYM";

    findOneStub.returns({
          populate: sinon.stub().resolves(fakeInventoryItem)
    });

    const response = await request(app)
      .post('/graphql')
      .set('Authorization', `${token}`)
      .send({
        query: `query GetInventory($getInventoryId: String) {
      getInventory(id: $getInventoryId) {
        id,
        itemName,
        quantity,
        sku,
        warehouseLocation
        supplier {
          contactPerson,
          emailAddress,
          id,
          phoneNumber,
          supplierName
        }
      }
    }`,
        variables: {"getInventoryId":"66630ac577e531b2b8ca8977"}
      });
    expect(response.body.data.getInventory).toEqual(
      {
        id: fakeInventoryItem.id,
        itemName: fakeInventoryItem.itemName,
        sku: fakeInventoryItem.sku,
        quantity: fakeInventoryItem.quantity,
        warehouseLocation: fakeInventoryItem.warehouseLocation,
        supplier: {
          id: fakeInventoryItem.supplier.id,
          supplierName: fakeInventoryItem.supplier.supplierName,
          contactPerson: fakeInventoryItem.supplier.contactPerson,
          phoneNumber: fakeInventoryItem.supplier.phoneNumber,
          emailAddress: fakeInventoryItem.supplier.emailAddress,
        },
      });
  });
});
