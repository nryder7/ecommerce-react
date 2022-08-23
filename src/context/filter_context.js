import React, { useEffect, useContext, useReducer } from 'react';
import reducer from '../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';
import { useProductsContext } from './products_context';

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: 'nameA',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    actual_price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();
  const setGrid = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setList = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    dispatch({ type: UPDATE_SORT, payload: e.target.value });
  };

  const updateFilters = (e) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.filters, state.sort, products]);

  return (
    <FilterContext.Provider
      value={{ ...state, setGrid, setList, updateSort, updateFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
