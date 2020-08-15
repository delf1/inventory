import {
  LOAD_INVENTORY_SUCCESS,
  CREATE_INVENTORY_ITEM_SUCCESS,
  UPDATE_INVENTORY_ITEM_SUCCESS,
  DELETE_INVENTORY_ITEM_SUCCESS,
} from "../actions/InventoryActions";

const initialState = {};

const InventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_INVENTORY_SUCCESS:
      return action.inventory;
    case CREATE_INVENTORY_ITEM_SUCCESS:
      return { ...state, [action.inventoryItem.id]: action.inventoryItem };
    case UPDATE_INVENTORY_ITEM_SUCCESS:
      return { ...state, [action.inventoryItem.id]: action.inventoryItem };
    case DELETE_INVENTORY_ITEM_SUCCESS:
      return state.filter((inventoryItem) => inventoryItem.id !== action.id);
    default:
      return state;
  }
};

export default InventoryReducer;
