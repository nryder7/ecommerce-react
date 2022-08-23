import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      grid_view: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      grid_view: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }

  if (action.type === SORT_PRODUCTS) {
    let tempProducts = [];
    const { filtered_products, sort } = state;
    if (sort === 'nameA') {
      tempProducts = filtered_products.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sort === 'nameZ') {
      tempProducts = filtered_products.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    if (sort === 'priceLow') {
      tempProducts = filtered_products.sort((a, b) => a.price - b.price);
    }
    if (sort === 'priceHigh') {
      tempProducts = filtered_products.sort((a, b) => b.price - a.price);
    }
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }
  if (action.type === UPDATE_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        [action.payload.name]: action.payload.value,
      },
    };
  }

  if (action.type === FILTER_PRODUCTS) {
    let tempProducts = [...state.all_products].filter((item) => {
      const { category, color, company } = state.filters;
      if (
        (item.category === category || category === 'all') &&
        (item.colors.includes(color) || color === 'all') &&
        (item.company === company || company === 'all')
      ) {
        return item;
      }
    });
    return {
      ...state,
      filtered_products: tempProducts,
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
