import * as inventoryApi from "../../api/InventoryApi";

export const LOADING_INVENTORY = "LOADING_INVENTORY";
export const LOAD_INVENTORY_SUCCESS = "LOAD_INVENTORY_SUCCESS";
export const LOAD_INVENTORY_ERROR = "LOAD_INVENTORY_ERROR";
export const CREATE_INVENTORY_ITEM_SUCCESS = "CREATE_INVENTORY_ITEM_SUCCESS";
export const CREATE_INVENTORY_ITEM_ERROR = "CREATE_INVENTORY_ITEM_ERROR";
export const UPDATE_INVENTORY_ITEM_SUCCESS = "UPDATE_INVENTORY_ITEM_SUCCESS";
export const UPDATE_INVENTORY_ITEM_ERROR = "UPDATE_INVENTORY_ITEM_ERROR";
export const DELETE_INVENTORY_ITEM_SUCCESS = "DELETE_INVENTORY_ITEM_SUCCESS";
export const DELETE_INVENTORY_ITEM_ERROR = "DELETE_INVENTORY_ITEM_ERROR";

const setLoadingInventory = (loading) => {
  return { type: LOADING_INVENTORY, loading: loading };
};

export const getAllInventory = () => (dispatch) => {
  dispatch(setLoadingInventory(true));
  inventoryApi
    .getAllInventory()
    .then((inventory) => {
      dispatch({
        type: LOAD_INVENTORY_SUCCESS,
        inventory,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOAD_INVENTORY_ERROR,
        error,
      });
    });
  dispatch(setLoadingInventory(false));
};

export const saveInventoryItem = (inventoryItem) => (dispatch) => {
  inventoryItem.id === undefined
    ? inventoryApi
        .createInventoryItem(inventoryItem)
        .then(() =>
          dispatch({
            type: CREATE_INVENTORY_ITEM_SUCCESS,
            inventoryItem,
          })
        )
        .catch((err) =>
          dispatch({
            type: CREATE_INVENTORY_ITEM_ERROR,
            error: err,
          })
        )
    : inventoryApi
        .updateInventoryItem(inventoryItem)
        .then(() =>
          dispatch({
            type: UPDATE_INVENTORY_ITEM_SUCCESS,
            inventoryItem,
          })
        )
        .catch((err) =>
          dispatch({
            type: UPDATE_INVENTORY_ITEM_ERROR,
            error: err,
          })
        );
};

export const deleteInventoryItem = (id) => (dispatch) => {
  inventoryApi
    .deleteInventoryItem(id)
    .then(
      dispatch({
        type: DELETE_INVENTORY_ITEM_SUCCESS,
        id,
      })
    )
    .catch(
      dispatch({
        type: DELETE_INVENTORY_ITEM_ERROR,
      })
    );
};
