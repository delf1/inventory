import Mock from "../mock";

const ProductsDB = {
  productsList: {
    1: {
      id: 1,
      name: "Brownies",
      ingredients: [{ id: 1, quantity: 3 }],
    },
    2: {
      id: 2,
      name: "Pie",
      ingredients: [{ id: 3, quantity: 14 }],
    },
    3: {
      id: 3,
      name: "Cake",
      ingredients: [
        { id: 1, quantity: 6 },
        { id: 2, quantity: 5 },
        { id: 3, quantity: 12 },
      ],
    },
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Mock.onGet("/api/products/").reply(async () => {
  const response = ProductsDB.productsList;
  return [200, response];
});
