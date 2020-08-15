import Mock from "../mock";

const ProductsDB = {
  productsList: {
    1: {
      id: 1,
      name: "Brownies",
    },
    2: {
      id: 2,
      name: "Pie",
    },
    3: {
      id: 3,
      name: "Cake",
    },
  },
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Mock.onGet("/api/products/").reply(async () => {
  const response = ProductsDB.productsList;
  await sleep(1000);
  return [200, response];
});
