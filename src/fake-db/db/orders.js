import Mock from "../mock";
import { status } from "../../app/utils/orderUtils";

const OrdersDB = {
  ordersList: [
    {
      id: 1,
      deliveryDate: new Date(),
      items: [{ id: 1, quantity: 2, price: 100 }],
      customer: {
        name: "A",
        phone: "0000",
      },
      status: status.complete,
    },
    {
      id: 2,
      deliveryDate: new Date(),
      items: [
        { id: 1, quantity: 2, price: 100.1 },
        { id: 2, quantity: 5, price: 30 },
      ],
      customer: {
        name: "A",
        phone: "0000",
      },
      status: status.complete,
    },
    {
      id: 3,
      deliveryDate: new Date(),
      items: [
        { id: 1, quantity: 4, price: 38.2 },
        { id: 2, quantity: 10, price: 35.5 },
        { id: 3, quantity: 3, price: 60.9 },
      ],
      customer: {
        name: "A",
        phone: "0000",
      },
      status: status.pending,
    },
  ],
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

Mock.onGet("/api/orders/").reply(async () => {
  const response = OrdersDB.ordersList;
  await sleep(500);
  return [200, response];
});
