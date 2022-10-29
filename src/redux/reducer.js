import * as ACTION_TYPE from './actionType';
import * as KEYS from '../helpers/keys';

const initialState = {
  allProducts: [],
  isLoading: false,
  searchText: '',
  appliedFilters: new Map(),
  filteredProducts: null,
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ACTION_TYPE.GET_PRODUCTS: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case ACTION_TYPE.GET_PRODUCTS_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: true,
        allProducts: payload.allProducts,
      });
    }

    case ACTION_TYPE.ADD_PRODUCT_IN_CART: {
      const itemIndex = state.allProducts.indexOf(payload.product);
      // use refProduct to update values in it
      const itemRef = state.allProducts[itemIndex];

      if (itemRef.qty && itemRef.totalPrice) {
        itemRef.qty += 1;
        itemRef.totalPrice += payload.product.price;
      } else {
        itemRef.qty = 1;
        itemRef.totalPrice = payload.product.price;
      }

      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case ACTION_TYPE.REMOVE_PRODUCT_FROM_CART: {
      const itemIndex = state.allProducts.indexOf(payload.product);
      // use refProduct to update values in it
      const itemRef = state.allProducts[itemIndex];
      itemRef.qty--;
      itemRef.totalPrice -= payload.product.price;

      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case ACTION_TYPE.SEARCH_ACTIVE: {
      let filteredProducts = Array.from(state.allProducts);
      let appliedFilters = state.appliedFilters;
      let searchText = payload.st;
      // remove any filters before search and start fresh
      appliedFilters.clear();
      // update applied filter type
      appliedFilters.set(KEYS.APPLIED_FILTER_TYPE.SEARCH, 'Search');

      switch (payload.ft) {
        case KEYS.SEARCH:
          filteredProducts = filteredProducts.filter(item =>
            item.title.toLowerCase().includes(payload.st.toLowerCase()),
          );
          break;

        case KEYS.CLEAR_SEARCH:
          appliedFilters.delete(KEYS.APPLIED_FILTER_TYPE.SEARCH);
          filteredProducts = null;
          searchText = '';
          break;
      }

      return Object.assign({}, state, {
        isLoading: false,
        searchText: searchText,
        appliedFilters: appliedFilters,
        filteredProducts: filteredProducts,
      });
    }

    case ACTION_TYPE.SORT_ACTIVE: {
      // check data source on sort to apply
      let filteredProducts = Array.from(
        state.filteredProducts || state.allProducts,
      );
      let appliedFilters = state.appliedFilters;
      // update applied filter type
      appliedFilters.set(KEYS.APPLIED_FILTER_TYPE.SORT, payload.label);

      switch (payload.ft) {
        case KEYS.SORT_BY_HIGHEST_PRICE:
          filteredProducts = filteredProducts.sort(
            (p1, p2) => p2.price - p1.price,
          );
          break;

        case KEYS.SORT_BY_LOWEST_PRICE:
          filteredProducts = filteredProducts.sort(
            (p1, p2) => p1.price - p2.price,
          );
          break;

        case KEYS.SORT_BY_ASCENDING_NAME:
          filteredProducts = filteredProducts.sort((p1, p2) =>
            p1.title.toLowerCase() > p2.title.toLowerCase() ? 1 : -1,
          );
          break;

        case KEYS.SORT_BY_DESCENDING_NAME:
          filteredProducts = filteredProducts.sort((p1, p2) =>
            p1.title.toLowerCase() < p2.title.toLowerCase() ? 1 : -1,
          );
          break;

        case KEYS.CLEAR_SORT:
          filteredProducts = null;
          appliedFilters.delete(KEYS.APPLIED_FILTER_TYPE.SORT);
          break;
      }

      return Object.assign({}, state, {
        isLoading: false,
        appliedFilters: appliedFilters,
        filteredProducts: filteredProducts,
      });
    }

    case ACTION_TYPE.FILTER_ACTIVE: {
      let appliedFilters = state.appliedFilters;
      // update applied filter type
      appliedFilters.set(
        KEYS.APPLIED_FILTER_TYPE.FILTER,
        payload.stringFilters,
      );

      return Object.assign({}, state, {
        isLoading: false,
        searchText: '',
        appliedFilters: appliedFilters,
        filteredProducts: payload.products,
      });
    }

    case ACTION_TYPE.CLEAR_FILTER: {
      // clear all
      return Object.assign({}, state, {
        isLoading: false,
        searchText: '',
        appliedFilters: new Map(),
        filteredProducts: null,
      });
    }

    default:
      return Object.assign({}, state);
  }
};
