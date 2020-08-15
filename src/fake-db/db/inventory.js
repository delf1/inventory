import Mock from "../mock";

const InventoryDB = {
  inventory: {
    1: {
      id: 1,
      name: "Egg",
      available: 25,
      unit: "",
      history: [
        { id: 1, date: new Date(), quantity: 3, price: 10 },
        { id: 2, date: new Date(), quantity: 5, price: 15 },
      ],
    },
    2: {
      id: 2,
      name: "Butter",
      available: 15,
      unit: "stick",
      history: [
        { id: 1, date: new Date(), quantity: 3, price: 10 },
        { id: 2, date: new Date(), quantity: 1, price: 12 },
        { id: 3, date: new Date(), quantity: 12, price: 15 },
      ],
    },
    3: {
      id: 3,
      name: "Milk",
      available: 8,
      unit: "carton",
      history: [{ id: 1, date: new Date(), quantity: 3, price: 8 }],
    },
    4: {
      id: 4,
      name: "Chocolate",
      available: 13,
      unit: "bars",
      history: [{ id: 1, date: new Date(), quantity: 3, price: 8 }],
    },
  },
};

Mock.onGet("/api/inventory/").reply(async () => {
  const response = InventoryDB.inventory;
  return [200, response];
});

// Mock.onPut("/api/inventory").reply(async (config) => {
//   InventoryDB.inventory = {
//     ...InventoryDB.inventory,
//     [config.data.id]: config.data,
//   };
//   return [200];
// });

Mock.onPut("/api/inventory/1").reply(async (config) => {
  InventoryDB.inventory = {
    ...InventoryDB.inventory,
    1: config.data,
  };
  return [200];
});

Mock.onPut("/api/inventory/2").reply(async (config) => {
  InventoryDB.inventory = {
    ...InventoryDB.inventory,
    2: config.data,
  };
  return [200];
});

Mock.onPut("/api/inventory/3").reply(async (config) => {
  InventoryDB.inventory = {
    ...InventoryDB.inventory,
    3: config.data,
  };
  return [200];
});

Mock.onPut("/api/inventory/4").reply(async (config) => {
  InventoryDB.inventory = {
    ...InventoryDB.inventory,
    4: config.data,
  };
  return [200];
});
