import axios from 'axios';

// URL API
const API_URL = 'http://localhost:3000';

// Các action types
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';

// Action creator để fetch sản phẩm
export const fetchProducts = () => async dispatch => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Có lỗi xảy ra khi lấy danh sách sản phẩm:', error);
    }
};

// Action creator để thêm sản phẩm
export const addProduct = (product) => async dispatch => {
    try {
        const response = await axios.post(`${API_URL}/products`, product);
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm sản phẩm:', error);
    }
};
