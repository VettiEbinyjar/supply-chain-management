const user = [
    {
      "username": "johndoe123",
      "email": "johndoe123@example.com",
      "password": "P@ssw0rd123!",
      "confirmPassword": "P@ssw0rd123!"
    },
    {
      "username": "janedoe456",
      "email": "janedoe456@example.com",
      "password": "S3cur3P@ss!",
      "confirmPassword": "S3cur3P@ss!"
    },
    {
      "username": "mikebrown789",
      "email": "mikebrown789@example.com",
      "password": "P@ssword456#",
      "confirmPassword": "P@ssword456#"
    },
    {
      "username": "sarasmith101",
      "email": "sarasmith101@example.com",
      "password": "Passw0rd#789",
      "confirmPassword": "Passw0rd#789"
    },
    {
      "username": "robertjohnson102",
      "email": "robertjohnson102@example.com",
      "password": "S@feP@ss789!",
      "confirmPassword": "S@feP@ss789!"
    },
    {
      "username": "emilydavis103",
      "email": "emilydavis103@example.com",
      "password": "S3cureP@ssw0rd!",
      "confirmPassword": "S3cureP@ssw0rd!"
    },
    {
      "username": "davemiller104",
      "email": "davemiller104@example.com",
      "password": "P@ssword!123",
      "confirmPassword": "P@ssword!123"
    },
    {
      "username": "amandawilson105",
      "email": "amandawilson105@example.com",
      "password": "S@feP@ss!456",
      "confirmPassword": "S@feP@ss!456"
    },
    {
      "username": "chrismoore106",
      "email": "chrismoore106@example.com",
      "password": "Str0ngP@ssw0rd!",
      "confirmPassword": "Str0ngP@ssw0rd!"
    },
    {
      "username": "lisataylor107",
      "email": "lisataylor107@example.com",
      "password": "P@ssw0rd#789!",
      "confirmPassword": "P@ssw0rd#789!"
    }
  ]
  
const supplier = [
    {
      "supplierName": "Global Supplies Ltd.",
      "contactPerson": "John Smith",
      "phoneNumber": "+1-800-555-1234",
      "emailAddress": "john.smith@globalsupplies.com"
    },
    {
      "supplierName": "Alpha Wholesale",
      "contactPerson": "Jane Doe",
      "phoneNumber": "+1-800-555-5678",
      "emailAddress": "jane.doe@alphawholesale.com"
    },
    {
      "supplierName": "Prime Distributors",
      "contactPerson": "Michael Brown",
      "phoneNumber": "+1-800-555-8765",
      "emailAddress": "michael.brown@primedistributors.com"
    },
    {
      "supplierName": "Supply Chain Co.",
      "contactPerson": "Sarah Johnson",
      "phoneNumber": "+1-800-555-4321",
      "emailAddress": "sarah.johnson@supplychainco.com"
    },
    {
      "supplierName": "Omega Products",
      "contactPerson": "Robert Williams",
      "phoneNumber": "+1-800-555-6789",
      "emailAddress": "robert.williams@omegaproducts.com"
    },
    {
      "supplierName": "Universal Traders",
      "contactPerson": "Emily Davis",
      "phoneNumber": "+1-800-555-3456",
      "emailAddress": "emily.davis@universaltraders.com"
    },
    {
      "supplierName": "Quality Goods Inc.",
      "contactPerson": "David Wilson",
      "phoneNumber": "+1-800-555-2345",
      "emailAddress": "david.wilson@qualitygoods.com"
    },
    {
      "supplierName": "Premier Supplies",
      "contactPerson": "Amanda Miller",
      "phoneNumber": "+1-800-555-7890",
      "emailAddress": "amanda.miller@premiersupplies.com"
    },
    {
      "supplierName": "NextGen Suppliers",
      "contactPerson": "Chris Moore",
      "phoneNumber": "+1-800-555-9876",
      "emailAddress": "chris.moore@nextgensuppliers.com"
    },
    {
      "supplierName": "Elite Products",
      "contactPerson": "Lisa Taylor",
      "phoneNumber": "+1-800-555-6543",
      "emailAddress": "lisa.taylor@eliteproducts.com"
    }
  ]
  
const inventoryItem = [
    {
      "itemName": "Wireless Mouse",
      "sku": "WM-12345",
      "quantity": 150,
      "warehouseLocation": "A1-01",
      "supplierId": "make sure to give valid object Id of supplier"
    },
    {
      "itemName": "Mechanical Keyboard",
      "sku": "MK-67890",
      "quantity": 100,
      "warehouseLocation": "B2-02",
      "supplierId": "SUP-002"
    },
    {
      "itemName": "USB-C Cable",
      "sku": "UC-11121",
      "quantity": 500,
      "warehouseLocation": "C3-03",
      "supplierId": "SUP-003"
    },
    {
      "itemName": "HD Monitor",
      "sku": "HD-22232",
      "quantity": 75,
      "warehouseLocation": "D4-04",
      "supplierId": "SUP-004"
    },
    {
      "itemName": "External Hard Drive",
      "sku": "EH-33343",
      "quantity": 200,
      "warehouseLocation": "E5-05",
      "supplierId": "SUP-005"
    },
    {
      "itemName": "Laptop Stand",
      "sku": "LS-44454",
      "quantity": 250,
      "warehouseLocation": "F6-06",
      "supplierId": "SUP-006"
    },
    {
      "itemName": "Bluetooth Speaker",
      "sku": "BS-55565",
      "quantity": 300,
      "warehouseLocation": "G7-07",
      "supplierId": "SUP-007"
    },
    {
      "itemName": "Webcam",
      "sku": "WC-66676",
      "quantity": 120,
      "warehouseLocation": "H8-08",
      "supplierId": "SUP-008"
    },
    {
      "itemName": "Portable Charger",
      "sku": "PC-77787",
      "quantity": 400,
      "warehouseLocation": "I9-09",
      "supplierId": "SUP-009"
    },
    {
      "itemName": "Wireless Earbuds",
      "sku": "WE-88898",
      "quantity": 180,
      "warehouseLocation": "J10-10",
      "supplierId": "SUP-010"
    }
  ]

const shipmentData = [
  {
    origin: "New York",
    destination: "Los Angeles",
    status: "In transit",
    estimatedDeliveryDate: "2024-06-15",
    inventoryItems: [
      "make sure to give valid inventory objectId",
      "60c42f5b8b918e001fef3c6b"
    ]
  },
  {
    origin: "London",
    destination: "Paris",
    status: "Delivered",
    estimatedDeliveryDate: "2024-06-10",
    inventoryItems: [
      "60c42f5b8b918e001fef3c6c",
      "60c42f5b8b918e001fef3c6d"
    ]
  },
  {
    origin: "Tokyo",
    destination: "Seoul",
    status: "In transit",
    estimatedDeliveryDate: "2024-06-20",
    inventoryItems: [
      "60c42f5b8b918e001fef3c6e",
      "60c42f5b8b918e001fef3c6f"
    ]
  },
  {
    origin: "Sydney",
    destination: "Melbourne",
    status: "Delayed",
    estimatedDeliveryDate: "2024-06-12",
    inventoryItems: [
      "60c42f5b8b918e001fef3c70",
      "60c42f5b8b918e001fef3c71"
    ]
  },
  {
    origin: "Berlin",
    destination: "Madrid",
    status: "Delivered",
    estimatedDeliveryDate: "2024-06-08",
    inventoryItems: [
      "60c42f5b8b918e001fef3c72",
      "60c42f5b8b918e001fef3c73"
    ]
  },
  {
    origin: "Rome",
    destination: "Athens",
    status: "In transit",
    estimatedDeliveryDate: "2024-06-18",
    inventoryItems: [
      "60c42f5b8b918e001fef3c74",
      "60c42f5b8b918e001fef3c75"
    ]
  },
  {
    origin: "Moscow",
    destination: "Saint Petersburg",
    status: "In transit",
    estimatedDeliveryDate: "2024-06-17",
    inventoryItems: [
      "60c42f5b8b918e001fef3c76",
      "60c42f5b8b918e001fef3c77"
    ]
  },
  {
    origin: "Beijing",
    destination: "Shanghai",
    status: "Delayed",
    estimatedDeliveryDate: "2024-06-11",
    inventoryItems: [
      "60c42f5b8b918e001fef3c78",
      "60c42f5b8b918e001fef3c79"
    ]
  },
  {
    origin: "Dubai",
    destination: "Doha",
    status: "In transit",
    estimatedDeliveryDate: "2024-06-16",
    inventoryItems: [
      "60c42f5b8b918e001fef3c7a",
      "60c42f5b8b918e001fef3c7b"
    ]
  },
  {
    origin: "Toronto",
    destination: "Vancouver",
    status: "Delivered",
    estimatedDeliveryDate: "2024-06-09",
    inventoryItems: [
      "60c42f5b8b918e001fef3c7c",
      "60c42f5b8b918e001fef3c7d"
    ]
  }
];
  
  console.log(testData);
  