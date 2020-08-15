import * as productApi from "../../api/ProductApi";

export const LOADING_PRODUCTS = "LOADING_PRODUCTS";
export const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS";
export const LOAD_PRODUCTS_ERROR = "LOAD_PRODUCTS_ERROR";
export const CREATE_PRODUCT_SUCCESS = "CREATE_PRODUCT_SUCCESS";
export const CREATE_PRODUCT_ERROR = "CREATE_PRODUCT_ERROR";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_ERROR = "UPDATE_PRODUCT_ERROR";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";

const setLoadingProducts = (loading) => {
  return { type: LOADING_PRODUCTS, loading: loading };
};

export const getAllProducts = () => (dispatch) => {
  dispatch(setLoadingProducts(true));
  productApi
    .getAllProducts()
    .then((products) => {
      dispatch({
        type: LOAD_PRODUCTS_SUCCESS,
        products,
      });
    })
    .catch((error) => {
      dispatch({
        type: LOAD_PRODUCTS_ERROR,
        error,
      });
    });
  dispatch(setLoadingProducts(false));
};

export const saveProduct = (product) => (dispatch) => {
  product.id === undefined
    ? productApi
        .createProduct(product)
        .then(() =>
          dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            product,
          })
        )
        .catch((err) =>
          dispatch({
            type: CREATE_PRODUCT_ERROR,
            error: err,
          })
        )
    : productApi
        .updateProduct(product)
        .then(() =>
          dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            product,
          })
        )
        .catch((err) =>
          dispatch({
            type: UPDATE_PRODUCT_ERROR,
            error: err,
          })
        );
};

export const deleteProduct = (id) => (dispatch) => {
  productApi
    .deleteProduct(id)
    .then(
      dispatch({
        type: DELETE_PRODUCT_SUCCESS,
        id,
      })
    )
    .catch(
      dispatch({
        type: DELETE_PRODUCT_ERROR,
      })
    );
};
