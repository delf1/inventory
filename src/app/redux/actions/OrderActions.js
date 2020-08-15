import * as orderApi from "../../api/OrderApi";

export const LOADING_ORDERS = "LOADING_ORDERS";
export const LOAD_ORDERS_SUCCESS = "LOAD_ORDERS_SUCCESS";
export const LOAD_ORDERS_ERROR = "LOAD_ORDERS_ERROR";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_ERROR = "CREATE_ORDER_ERROR";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_ERROR = "UPDATE_ORDER_ERROR";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_ERROR = "DELETE_ORDER_ERROR";

const setLoadingOrders = (loading) => {
  return { type: LOADING_ORDERS, loading: loading };
};

export const getAllOrders = () => (dispatch) => {
  dispatch(setLoadingOrders(true));
  orderApi
    .getAllOrders()
    .then((orders) => {
      dispatch({
        type: LOAD_ORDERS_SUCCESS,
        orders,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ORDERS_ERROR,
        error,
      });
    });
  dispatch(setLoadingOrders(false));
};

export const saveOrder = (order) => (dispatch) => {
  order.id
    ? orderApi
        .updateOrder(order)
        .then(() =>
          dispatch({
            type: CREATE_ORDER_SUCCESS,
            order,
          })
        )
        .catch((err) =>
          dispatch({
            type: CREATE_ORDER_ERROR,
            error: err,
          })
        )
    : orderApi
        .createOrder(order)
        .then(() =>
          dispatch({
            type: UPDATE_ORDER_SUCCESS,
            order,
          })
        )
        .catch((err) =>
          dispatch({
            type: UPDATE_ORDER_ERROR,
            error: err,
          })
        );
};

export const deleteOrder = (id) => (dispatch) => {
  orderApi
    .deleteOrder(id)
    .then(
      dispatch({
        type: DELETE_ORDER_SUCCESS,
        id,
      })
    )
    .catch(
      dispatch({
        type: DELETE_ORDER_ERROR,
      })
    );
};
