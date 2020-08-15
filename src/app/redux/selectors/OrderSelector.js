import { createSelector } from "reselect";
import currency from "currency.js";
import { getProducts } from "./ProductSelector";

export const getOrders = (state) => state.orders;

export const convertToCurrency = createSelector([getOrders], (orders) => {
  console.log(orders);
  return orders.map((order) => {
    const items = order.items.map((item) => ({
      ...item,
      price: currency(item.price, { symbol: "USD " }),
    }));

    return { ...order, items };
  });
});

export const enrichedOrder = createSelector(
  [convertToCurrency, getProducts],
  (orders, products) => {
    return orders.map((order) => {
      const items = order.items.map((item) => ({
        ...item,
        ...products[item.id],
      }));

      return { ...order, items };
    });
  }
);
