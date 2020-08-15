import { createSelector } from "reselect";
import currency from "currency.js";

export const getInventory = (state) => state.inventory;

export const parseDates = createSelector([getInventory], (inventory) => {
  const newInventory = {};
  Object.entries(inventory).forEach(([key, val]) => {
    newInventory[key] = {
      ...val,
      history:
        val.history !== undefined
          ? val.history.map((historyItem) => ({
              ...historyItem,
              date: new Date(historyItem.date),
            }))
          : [],
    };
  });
  return newInventory;
});

export const enrichedInventory = createSelector([parseDates], (inventory) => {
  const newInventory = {};
  Object.entries(inventory).forEach(([key, val]) => {
    newInventory[key] = {
      ...val,
      history:
        val.history !== undefined
          ? val.history.map((historyItem) => ({
              ...historyItem,
              price: currency(historyItem.price, { symbol: "USD " }),
            }))
          : [],
    };
  });
  return newInventory;
});
