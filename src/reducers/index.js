import { combineReducers } from 'redux';
import productReducer from './productReducer'; // Thay đổi theo tên của bạn

const rootReducer = combineReducers({
    products: productReducer, // Thay đổi theo tên của bạn
    // Thêm các reducer khác nếu có
});

export default rootReducer;
