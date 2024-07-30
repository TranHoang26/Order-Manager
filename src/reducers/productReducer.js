// src/reducers/productReducer.js
import { FETCH_PRODUCTS_SUCCESS, ADD_PRODUCT_SUCCESS } from '../actions/productActions';

const initialState = {
    products: []
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload]
            };
        default:
            return state;
    }
};

export default productReducer;
