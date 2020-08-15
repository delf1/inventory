import {
  LOAD_PRODUCTS_SUCCESS,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_SUCCESS,
} from "../actions/ProductActions";
const initialState = {};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_SUCCESS:
      return action.products;
    case CREATE_PRODUCT_SUCCESS:
      return { ...state, [action.product.id]: action.product };
    case UPDATE_PRODUCT_SUCCESS:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    case DELETE_PRODUCT_SUCCESS:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
};

export default ProductReducer;
