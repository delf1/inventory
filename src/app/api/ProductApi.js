import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";

const baseUrl = "/api/products/";

export const getAllProducts = () =>
  axios.get(baseUrl).then(handleResponse).catch(handleError);

export const createProduct = (product) =>
  axios.post(baseUrl, product).then(handleResponse).catch(handleError);

export const updateProduct = (product) =>
  axios
    .put(baseUrl + product.id, product)
    .then(handleResponse)
    .catch(handleError);

export const deleteProduct = (id) =>
  axios
    .delete(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
