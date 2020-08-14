import { createSelector } from "reselect";
import currency from "currency.js";

const getOrders = (state) => state.orders;

export const convertToCurrency = createSelector([getOrders], (orders) => {
  return orders.map((order) => {
    const items = order.items.map((item) => ({
      ...item,
      price: currency(item.price, { symbol: "USD " }),
    }));

    return { ...order, items };
  });
});
