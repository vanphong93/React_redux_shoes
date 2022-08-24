import { combineReducers } from "redux";
import { shoeReducer } from "./shoeReducer";
export const rootReducer_Shop=combineReducers({
    shoeReducer,
})