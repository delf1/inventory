import { createSelector } from "reselect";
import { enrichedInventory } from "./InventorySelector";

export const getProducts = (state) => state.products;

export const enrichedProducts = createSelector(
  [getProducts, enrichedInventory],
  (products, inventory) => {
    const newProducts = {};
    Object.entries(products).forEach(([key, product]) => {
      newProducts[key] = {
        ...product,
        ingredients: product.ingredients.map((ingredient) => ({
          ...ingredient,
          ...inventory[ingredient.id],
        })),
      };
    });
    console.log(newProducts);
    return newProducts;
  }
);
