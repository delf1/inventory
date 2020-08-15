import currency from "currency.js";

export const status = Object.freeze({
  complete: "complete",
  pending: "pending",
});

export const method = Object.freeze({
  delivery: "delivery",
  pickup: "pickup",
});

export const zeroValue = currency(0, { symbol: "USD " });

export const getSummaryByItem = (orders) => {
  const map = {};

  orders.forEach((curr) =>
    curr.items.forEach((item) => {
      const tmp = map[item.id];
      map[item.id] = tmp
        ? {
            name: item.name,
            quantity: tmp.quantity + item.quantity,
            revenue: currency(tmp.revenue, { symbol: "USD " }).add(
              item.price.multiply(item.quantity)
            ),
          }
        : {
            name: item.name,
            quantity: item.quantity,
            revenue: item.price.multiply(item.quantity),
          };
    })
  );

  return map;
};

export const getItemList = (orders) => {
  const items = getSummaryByItem(orders);
  return Array.from(Object.keys(items)).map((key) => {
    return { ...items[key], id: key };
  });
};

export const calculateOrderTotal = ({ items = [] }) => {
  return items.reduce(
    (acc, curr) => acc.add(curr.price.multiply(curr.quantity)),
    zeroValue
  );
};
