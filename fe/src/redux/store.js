import { configureStore } from '@reduxjs/toolkit';
import accountReducer from '../redux/account/accountSlice.js';

export const store = configureStore({
    reducer: {
        account: accountReducer
    },
});
