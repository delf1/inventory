import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";

const baseUrl = "/api/inventory/";

export const getAllInventory = () =>
  axios.get(baseUrl).then(handleResponse).catch(handleError);

export const createInventoryItem = (inventoryItem) =>
  axios.post(baseUrl, inventoryItem).then(handleResponse).catch(handleError);

export const updateInventoryItem = (inventoryItem) =>
  axios
    .put(baseUrl + inventoryItem.id, inventoryItem)
    .then(handleResponse)
    .catch(handleError);

export const deleteInventoryItem = (id) =>
  axios
    .delete(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
