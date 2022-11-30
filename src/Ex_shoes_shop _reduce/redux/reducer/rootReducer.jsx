
import { configureStore } from "@reduxjs/toolkit";
import shoeReducer from './newShoeReducer';
export default configureStore({
    reducer: { shoeReducer },
});
