import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: {
        name: '',
        email: '',
        role: '',
    },
    shopId: null, 
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = { name: '', email: '', role: '' }; 
            state.shopId = null; 
        },
        setShopId: (state, action) => {
            state.shopId = action.payload; 
        },
    },
});

export const { login, logout, setShopId } = authSlice.actions;

export default authSlice.reducer;
