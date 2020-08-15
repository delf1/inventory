import Mock from "../mock";

const InventoryDB = {
  inventory: {
    1: {
      id: 1,
      name: "Egg",
      available: 5,
      unit: "dozen",
      history: [
        { id: 1, date: new Date(), quantity: 3, price: 10 },
        { id: 2, date: new Date(), quantity: 5, price: 15 },
      ],
    },
    2: {
      id: 2,
      name: "Butter",
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
      unit: "carton",
      history: [{ id: 1, date: new Date(), quantity: 3, price: 8 }],
    },
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Mock.onGet("/api/inventory/").reply(async () => {
  const response = InventoryDB.inventory;
  await sleep(1000);
  return [200, response];
});
