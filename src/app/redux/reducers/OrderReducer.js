import {
  LOAD_ORDERS_SUCCESS,
  CREATE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_SUCCESS,
} from "../actions/OrderActions";

const initialState = [];

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS_SUCCESS:
      return action.orders.map((order) => ({
        ...order,
        deliveryDate: new Date(order.deliveryDate),
      }));
    case CREATE_ORDER_SUCCESS:
      return [...state, { ...action.order }];
    case UPDATE_ORDER_SUCCESS:
      return state.map((order) =>
        order.id === action.order.id ? action.order : order
      );
    case DELETE_ORDER_SUCCESS:
      return state.filter((order) => order.id !== action.id);
    default:
      return state;
  }
};

export default OrderReducer;
