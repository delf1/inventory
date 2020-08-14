import axios from "axios";
import { handleResponse, handleError } from "./apiUtils";

const baseUrl = "/api/orders/";

export const getAllOrders = () =>
  axios.get(baseUrl).then(handleResponse).catch(handleError);

export const createOrder = (order) =>
  axios.post(baseUrl, order).then(handleResponse).catch(handleError);

export const updateOrder = (order) =>
  axios
    .put(baseUrl + order.id, order)
    .then(handleResponse)
    .catch(handleError);

export const deleteOrder = (id) =>
  axios
    .delete(baseUrl + id)
    .then(handleResponse)
    .catch(handleError);
