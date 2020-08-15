import Mock from "../mock";

const ProductsDB = {
  productsList: {
    1: {
      id: 1,
      name: "Brownies",
      ingredients: [
        { id: 1, quantity: 1 },
        { id: 2, quantity: 0.5 },
        { id: 4, quantity: 1 },
      ],
    },
    2: {
      id: 2,
      name: "Pie",
      ingredients: [{ id: 3, quantity: 2 }],
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

Mock.onGet("/api/products/").reply(async () => {
  const response = ProductsDB.productsList;
  return [200, response];
});
