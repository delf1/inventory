export const inventoryAfterOrder = (order, products, inventory) => {
  const newInventory = { ...inventory };
  order.items.forEach((item) =>
    products[item.id].ingredients.forEach((ingredient) => {
      newInventory[ingredient.id] = {
        ...newInventory[ingredient.id],
        available:
          newInventory[ingredient.id].available -
          item.quantity *
            products[item.id].ingredients.find((i) => i.id === ingredient.id)
              .quantity,
      };
    })
  );

  return newInventory;
};
