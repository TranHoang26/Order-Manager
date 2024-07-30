import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => action.payload,
        addProduct: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { setProducts, addProduct } = productsSlice.actions;
export default productsSlice.reducer;
