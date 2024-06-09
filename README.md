# Supply Chain Management Backend Service

## Overview

This backend service is designed to manage inventory, track shipments, and handle supplier information for a supply chain management application. It uses Node.js, Express.js, GraphQL, and MongoDB.

## Features

- **Inventory Management**: Manage inventory items with details such as item name, SKU, quantity, and warehouse location.
- **Shipment Tracking**: Track shipments with details such as shipment ID, origin, destination, status, and estimated delivery date.
- **Supplier Information**: Manage suppliers with details such as supplier name, contact person, phone number, and email address.
- **User Management**: User registration and authentication.

## Setup

### Prerequisites

- Node.js (v16 or later)
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/VettiEbinyjar/supply-chain-management.git
   cd supply-chain-management
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:

   ```plaintext
    MONGODB_URI=mongodb://localhost:27017/supply-chain
    PORT=4000
    JWT_SECRET=yoursupersecretkey
   ```

### Running the Server

To start the server, run:

```bash
npm start
```
The server will be running at `http://localhost:4000/graphql`.
graphql playground link interact with operatons: `https://studio.apollographql.com/sandbox/explorer`

``` bash
      please set headers Authorization with Bearer token when requesting other than register and login operations
```
### Project structure
```
supply-chain-management/
├── bin/
|    ├── www
├── src/
│   ├── config/
│   │   ├── db.js
│   ├── helpers/
│   │   ├── jwtHandler.js
│   │   ├── logger.js
│   ├── middleware/
│   │   ├── auth.js
│   ├── models/
│   │   ├── inventory.js
│   │   ├── shipment.js
│   │   └── supplier.js
│   │   └── user.js
│   ├── models/
│   │   ├── inventory.js
│   │   ├── shipment.js
│   │   └── supplier.js
│   │   └── user.js
│   ├── resolvers/
│   │   ├── inventoryResolver.js
│   │   ├── shipmentResolver.js
│   │   └── supplierResolver.js
│   │   └── userResolver.js
│   ├── schemas/
│   │   ├── inventorySchema.js
│   │   ├── shipmentSchema.js
│   │   └── supplierSchema.js
│   │   └── userSchema.js
├── apolloServer.js
├── app.js
├── tests/
│   ├── inventory.test.js
│   ├── shipment.test.js
│   └── supplier.test.js
│   └── users.test.js
└── package-lock.json
└── package.json
└── Dockerfile
└── docker-compose.yml
├── .env
└── README.md
```


## API Documentation

### GraphQL Schema
### Example Requests

#### User Management

**User Type**

```graphql
type User {
  id: ID!
  username: String!
  email: String!
  token: String
}
```

**User Queries**

```graphql
type Query {
  me: User
}
```

**User Mutations**

```graphql
type Mutation {
  register(username: String!, email: String!, password: String!, confirmPassword: String!): User
  login(email: String!, password: String!): User
}
```

#### Register User

```graphql
mutation {
  register(username: "testuser", email: "test@example.com", password: "password123", confirmPassword: "password123") {
    id
    username
    email
    token
  }
}
```

#### Login User

```graphql
mutation {
  login(email: "test@example.com", password: "password123") {
    id
    username
    email
    token
  }
}
```

#### Inventory Management

**Inventory Item Type**

```graphql
type InventoryItem {
  id: ID!
  name: String!
  sku: String!
  quantity: Int!
  warehouseLocation: String!
}
```

#### Add Inventory Item

```graphql
mutation {
  addInventoryItem(input: { name: "Item 1", sku: "SKU123", quantity: 100, warehouseLocation: "Warehouse A" }) {
    id
    name
    sku
    quantity
    warehouseLocation
  }
}
```


**Inventory Queries**

```graphql
type Query {
  inventoryItems(page: Int!, limit: Int!): [InventoryItem]
}
```

**Inventory Mutations**

```graphql
type Mutation {
  addInventoryItem(input: InventoryInput!): InventoryItem
  updateInventoryItem(id: ID!, input: InventoryInput!): InventoryItem
  deleteInventoryItem(id: ID!): InventoryItem
}
```

#### Shipment Tracking

**Shipment Type**

```graphql
type Shipment {
  id: ID!
  origin: String!
  destination: String!
  status: String!
  estimatedDeliveryDate: String!
}
```

**Shipment Input**

```graphql
input ShipmentInput {
  origin: String!
  destination: String!
  status: String!
  estimatedDeliveryDate: String!
}
```

**Shipment Queries**

```graphql
type Query {
  shipments: [Shipment]
}
```

**Shipment Mutations**

```graphql
type Mutation {
  addShipment(input: ShipmentInput!): Shipment
  updateShipmentStatus(id: ID!, status: String!): Shipment
}
```

#### Supplier Information

**Supplier Type**

```graphql
type Supplier {
  id: ID!
  name: String!
  contactPerson: String!
  phoneNumber: String!
  email: String!
}
```

**Supplier Input**

```graphql
input SupplierInput {
  name: String!
  contactPerson: String!
  phoneNumber: String!
  email: String!
}
```

**Supplier Queries**

```graphql
type Query {
  suppliers: [Supplier]
}
```

**Supplier Mutations**

```graphql
type Mutation {
  addSupplier(input: SupplierInput!): Supplier
  updateSupplier(id: ID!, input: SupplierInput!): Supplier
  deleteSupplier(id: ID!): Supplier
}
```


## Running Tests

To run the unit tests, use:

```bash
npm test
```

This command will execute the tests using Jest.

## how you can work with a Dockerfile and docker-compose.yml files for this project

### Instructions

1. **Build and Run the Containers**:
   - Navigate to the root of your project directory.
   - Run the following command to build and start the containers:
     ```bash
     docker-compose up --build
     ```

2. **Stop the Containers**:
   - To stop the containers, use the command:
     ```bash
     docker-compose down
     ```

### Additional Notes

- The `Dockerfile` sets up a Node.js environment, installs dependencies, and copies the application code. It then exposes port 4000 and defines the command to start the application.
- The `docker-compose.yml` file defines two services: the application (`app`) and the MongoDB database (`mongo`). It also sets up environment variables from a `.env` file and mounts volumes for persistent data storage.
- Ensure your `.env` file is properly configured with the necessary environment variables, including `MONGODB_URI`.

With these files, you can easily build and run your Node.js and MongoDB application using Docker, providing a consistent environment for development and deployment.

This README now includes the GraphQL schema directly in the API Documentation section, providing a comprehensive guide for setting up and using the backend service. Adjust the details as necessary to fit your project specifics.
