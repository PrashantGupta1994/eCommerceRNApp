import * as ACTION_TYPE from './actionType';
import * as KEYS from '../helpers/keys';

// --- ENCAPSULATED ---

const dispatchProductsSuccess = allProducts => {
  return {
    type: ACTION_TYPE.GET_PRODUCTS_SUCCESS,
    payload: {
      allProducts: allProducts,
    },
  };
};

const dispatchAddProductInCart = product => {
  return {
    type: ACTION_TYPE.ADD_PRODUCT_IN_CART,
    payload: {
      product: product,
    },
  };
};

const dispatchRemoveProductFromCart = product => {
  return {
    type: ACTION_TYPE.REMOVE_PRODUCT_FROM_CART,
    payload: {
      product: product,
    },
  };
};

const dispatchApplySearch = (st, ft) => {
  return {
    type: ACTION_TYPE.SEARCH_ACTIVE,
    payload: {
      st,
      ft,
    },
  };
};

const dispatchApplySort = (ft, label) => {
  return {
    type: ACTION_TYPE.SORT_ACTIVE,
    payload: {
      ft,
      label,
    },
  };
};

const dispatchApplyFilter = (products, stringFilters) => {
  return {
    type: ACTION_TYPE.FILTER_ACTIVE,
    payload: {
      products,
      stringFilters,
    },
  };
};

const dispatchClearFilter = () => {
  return {
    type: ACTION_TYPE.CLEAR_FILTER,
  };
};

// --- END ----

// --- PUBLIC ---

export const getProducts = () => {
  return async dispatch => {
    dispatch(() => {
      return {
        type: ACTION_TYPE.GET_PRODUCTS,
      };
    });
    const data = await fetch(
      'https://cloud.toddleapp.com/assets/mobile/hiring_material/ekart_data_26.json',
    );
    const jsonData = await data.json();
    dispatch(dispatchProductsSuccess(jsonData));
  };
};

export const addProductToCart = product => {
  return dispatch => {
    dispatch(dispatchAddProductInCart(product));
  };
};

export const removeProductFromCart = product => {
  return dispatch => {
    dispatch(dispatchRemoveProductFromCart(product));
  };
};

export const onApplySearch = ({st, ft}) => {
  return dispatch => {
    dispatch(dispatchApplySearch(st, ft));
  };
};

export const onApplySort = ({ft, label}) => {
  return dispatch => {
    dispatch(dispatchApplySort(ft, label));
  };
};

export const onApplyFilter = filters => {
  return (dispatch, getState) => {
    // Current Redux maintainer Mark Erikson says it's fine and even encouraged to use getState in thunks.
    let products = Array.from(getState().allProducts);
    let stringFilters = new Set();

    // loop through filters to get filtered products and dispatch them to store
    // v = value, k = key, and m = Map (es6)
    // ft = filter type, st = search text, label = filter text as shown in UI
    filters.forEach((v, k, m) => {
      if (v.ft === KEYS.FILTER_BY_RATING_VALUE) {
        products = products.filter(p => p.rating?.rate > v.st);
      }
      if (v.ft === KEYS.FILTER_BY_CATEGORY_NAME) {
        products = products.filter(p => p.category === v.st);
      }
      stringFilters.add(v.label);
    });

    // once done dispatch to store
    dispatch(dispatchApplyFilter(products, stringFilters));
  };
};

export const onClearFilter = () => {
  return dispatch => {
    dispatch(dispatchClearFilter());
  };
};
